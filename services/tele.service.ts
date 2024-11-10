import HttpService from '@/services/http.service';
import { AppDetail, AppHistory, AppWatch } from '@/types/app.type';
import { ResponseData } from '@/types/service.type';

interface PaginationParams {
  page: number;
  limit?: number;
}

class TeleService extends HttpService {
  async getTop50<T>(params: PaginationParams, endpoint: 'channel' | 'bot' | 'fdv' = 'fdv') {
    return await this.get<ResponseData<{ data: T[]; total: number }>>(`/top/${endpoint}`, {
      page: params.page,
      limit: params.limit || 10,
    });
  }

  async getAppDetail(username: string) {
    return await this.get<ResponseData<{ data: AppDetail }>>(`/app/${username}`);
  }

  async getAppHistory(username: string) {
    return await this.get<ResponseData<{ data: AppHistory }>>(`/app/${username}/history`);
  }

  async getWatchList() {
    return await this.get<ResponseData<{ data: AppWatch[] }>>(`/user/watchlist`, {}, false);
  }

  async addWatchList(username: string) {
    return await this.post<ResponseData<{}>, { username: string }>(
      `/user/watchlist`,
      { username },
      {},
      false,
    );
  }

  async searchAppTrack(keyword: string, type: 'bot' | '' = '') {
    return await this.get<ResponseData<{ data: string[] }>>(
      `/app/search`,
      { value: keyword, type: type },
      false,
    );
  }
}

export const teleService = new TeleService();
