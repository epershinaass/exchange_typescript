import { Observable } from 'rxjs';

export interface IGrpcService {
  refillBalance(refillBalanceInfo: IRefillBalanceRequest): Promise<any>;
  getBalance(balanceId: IGetBalanceRequest): Promise<IBalance>;
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
