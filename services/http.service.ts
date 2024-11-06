import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { getCookie, getCookies } from 'cookies-next';
import axiosRetry from 'axios-retry';
import { CacheRequestConfig, setupCache } from 'axios-cache-interceptor';
import { HttpMethodEnum, TokenEnum } from '@/common/enums/app.enum';
import { Params } from '@/types/service.type';

class HttpService {
  private readonly http: AxiosInstance;
  private baseURL = 'https://tgecko.catia.co/api/v1';

  constructor(customBaseUrl?: string) {
    this.http = setupCache(
      axios.create({
        baseURL: customBaseUrl || this.baseURL,
        withCredentials: false,
        timeout: 5000,
      }),
      {
        // ttl: 1000 * 3, // 3s cache
      },
    );

    this.injectInterceptors();
  }

  private async getAuthorization() {
    let accessToken = getCookie(TokenEnum.ACCESS) || '';
    // case get token on server side
    if (!accessToken && typeof window === 'undefined') {
      const cookieStore = await import('next/headers').then((res) => res.cookies());
      accessToken = cookieStore.get(TokenEnum.ACCESS)?.value || '';
    }
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  }

  // Initialize service configuration
  public service() {
    this.injectInterceptors();

    return this;
  }

  // Set up request headers
  private async setupHeaders(
    hasAttachment = false,
    isPublicApi = false,
  ): Promise<AxiosRequestConfig['headers']> {
    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': hasAttachment ? 'multipart/form-data' : 'application/json',
      withCredentials: true,
    };

    if (!isPublicApi) {
      Object.assign(headers, await this.getAuthorization());
    }

    return headers;
  }

  // Handle HTTP requests
  private async request<T>(
    method: HttpMethodEnum,
    url: string,
    options: AxiosRequestConfig | CacheRequestConfig,
  ): Promise<T> {
    // eslint-disable-next-line no-useless-catch
    const response: AxiosResponse<T> = await this.http.request<T>({
      method,
      url,
      ...options,
    });
    return response.data;
  }

  // Perform GET request
  public async get<T>(url: string, params?: Params, isPublicApi = false): Promise<T> {
    return this.request<T>(HttpMethodEnum.GET, url, {
      params,
      headers: await this.setupHeaders(false, isPublicApi),
      cache: {
        ttl: 1000 * 5,
        staleIfError: true, // use cache if there's an error
      },
    });
  }

  // Perform POST request
  public async post<T, P>(
    url: string,
    payload: P,
    params?: Params,
    isPublicApi = false,
  ): Promise<T> {
    return this.request<T>(HttpMethodEnum.POST, url, {
      params,
      data: payload,
      headers: await this.setupHeaders(payload instanceof FormData, isPublicApi),
    });
  }

  // Perform UPDATE request
  public async update<T, P>(
    url: string,
    payload: P,
    params?: Params,
    isPublicApi = false,
  ): Promise<T> {
    return this.request<T>(HttpMethodEnum.PUT, url, {
      params,
      data: payload,
      headers: await this.setupHeaders(payload instanceof FormData, isPublicApi),
    });
  }

  // Perform DELETE request
  public async remove<T>(url: string, params?: Params, isPublicApi = false): Promise<T> {
    return this.request<T>(HttpMethodEnum.DELETE, url, {
      params,
      headers: await this.setupHeaders(false, isPublicApi),
    });
  }

  // Inject interceptors for request and response
  private injectInterceptors() {
    // Set up request interceptor
    // @ts-expect-error type error
    this.http.interceptors.request.use(async (request: AxiosRequestConfig) => {
      // @TODO: implement an NProgress
      return {
        ...request,
      };
    });

    // Retry logic with axios-retry
    axiosRetry(this.http, {
      retries: 3,
      retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED';
      },
      retryDelay: (retryCount) => {
        console.log(`Retry attempt: ${retryCount}`);
        return retryCount * 1000; // delay 1S
      },
    });

    // Set up response interceptor
    this.http.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.code === 'ECONNABORTED') {
          console.error('Request timed out');
        }
        if (!error.response) return;
        const statusCode = error.response.status;
        if (statusCode === 401) {
          console.warn('Unauthorized. Redirecting to home page...');
          // window.location.href = '/';
        }

        if (statusCode === 403) {
          console.warn('Forbidden access');
          if (window.location.pathname.includes('/admin')) {
            window.location.href = '/admin/auth/login';
          }
        }

        if (statusCode === 500) {
          console.error('Internal Server Error');
        }
        return this.normalizeError(error);
      },
    );
  }

  // Normalize errors
  private normalizeError(error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

export { HttpService as default };
