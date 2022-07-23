import { Observable } from 'rxjs';

export interface IGrpcService {
  refillBalance(refillBalanceInfo: IRefillBalanceInfo): Observable<any>;
  getBalance(balanceId: IBalanceId): Observable<any>;
}

interface IRefillBalanceInfo {
  balanceId: string;
  transactionId: string;
  refillSum: number;
}

interface IBalanceId {
  balanceId: string;
}
