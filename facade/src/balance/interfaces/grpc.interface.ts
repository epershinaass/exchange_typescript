import { Observable } from 'rxjs';

export interface IGrpcService {
  accumulate(numberArray: INumberArray): Observable<any>;
  refillBalance(refillBalanceInfo: IRefillBalanceInfo): Observable<any>;
}

interface INumberArray {
  data: number[];
}

interface IRefillBalanceInfo {
  balanceId: string;
  transactionId: string;
  refillSum: number;
}
