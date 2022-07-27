export interface IGrpcService {
  refillBalance(refillBalanceInfo: IRefillBalanceRequest): Promise<any>;
  getBalance(userId: IGetBalanceRequest): Promise<IBalance>;
}

interface IRefillBalanceRequest {
  userId: string;
  transactionId: string;
  refillSum: number;
}

interface IGetBalanceRequest {
  userId: string;
}

export interface IBalance {
  total: number;
}
