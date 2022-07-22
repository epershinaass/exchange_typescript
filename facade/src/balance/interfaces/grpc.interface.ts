import { Observable } from 'rxjs';

export interface IGrpcService {
  accumulate(numberArray: INumberArray): Observable<any>;
  refillBalance(refillBalanceInfo: IRefillBalanceInfo): Observable<any>;
  getBalance(balanceId: IBalanceId): Observable<any>;
}

interface INumberArray {
  data: number[];
}

interface IRefillBalanceInfo {
  balanceId: string;
  transactionId: string;
  refillSum: number;
}

interface IBalanceId {
  balanceId: string;
}
