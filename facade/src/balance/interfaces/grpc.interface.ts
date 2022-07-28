import { Observable } from 'rxjs';

export interface IGrpcService {
  refillBalance(
    refillBalanceInfo: IRefillBalanceRequest,
  ): Observable<IRefillBalanceResponse>;
  getBalance(userId: IGetBalanceRequest): Observable<IGetBalanceResponse>;
}

interface IRefillBalanceRequest {
  userId: string;
  transactionId: string;
  refillSum: number;
}

export interface IRefillBalanceResponse {
  status: number;
}

interface IGetBalanceRequest {
  userId: string;
}

export interface IGetBalanceResponse {
  total: number;
}
