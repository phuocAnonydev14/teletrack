import HttpService from '@/services/http.service';
import { ResponseData } from '@/types/service.type';

class AuthService extends HttpService {
  async login(authId: string) {
    return this.post<ResponseData<{ data: string }>, { id: string }>(
      '/login',
      { id: authId },
      {},
      true,
    );
  }
}

export const authService = new AuthService();
