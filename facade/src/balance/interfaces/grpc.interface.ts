import { Observable } from 'rxjs';

export interface IGrpcService {
  refillBalance(refillBalanceInfo: IRefillBalanceRequest): Observable<any>;
  getBalance(balanceId: IGetBalanceRequest): Observable<any>;
}

interface IRefillBalanceRequest {
  balanceId: string;
  transactionId: string;
  refillSum: number;
}

interface IGetBalanceRequest {
  balanceId: string;
}
