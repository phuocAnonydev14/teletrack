import HttpService from '@/services/http.service';
import { AppDetail, AppHistory, AppTrack } from '@/types/app.type';

interface PaginationParams {
  page: number;
  limit?: number;
}

class TeleService extends HttpService {
  async getTop50(params: PaginationParams, endpoint: 'channel' | 'bot' = 'bot') {
    return await this.get<{ data: { data: AppTrack[]; total: number } }>(`/top/${endpoint}`, {
      page: params.page,
      limit: params.limit || 10,
    });
  }

  async getAppDetail(username: string) {
    return await this.get<{ data: { data: AppDetail } }>(`/app/${username}`);
  }

  async getAppHistory(username: string) {
    return await this.get<{
      data: { data: AppHistory };
    }>(`/app/${username}/history`);
  }
}

export const teleService = new TeleService();
