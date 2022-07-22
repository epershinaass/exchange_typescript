import { Observable } from 'rxjs';

export interface IGrpcService {
  refillBalance(refillBalanceInfo: IRefillBalanceInfo): Observable<any>;
}

interface IRefillBalanceInfo {
  balanceId: string;
  transactionId: string;
  refillSum: number;
}
