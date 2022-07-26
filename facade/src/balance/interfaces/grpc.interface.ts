import { Observable } from 'rxjs';

export interface IGrpcService {
  refillBalance(refillBalanceInfo: IRefillBalanceRequest): Observable<IBalance>;
  getBalance(balanceId: IGetBalanceRequest): Observable<IBalance>;
}

interface IRefillBalanceRequest {
  balanceId: string;
  transactionId: string;
  refillSum: number;
}

interface IGetBalanceRequest {
  balanceId: string;
}

export interface IBalance {
  total: number;
}
