export interface IGrpcService {
  refillBalance(refillBalanceInfo: IRefillBalanceRequest): Promise<any>;
  getBalance(userId: IGetBalanceRequest): Promise<IGetBalanceResponse>;
}

interface IRefillBalanceRequest {
  userId: string;
  transactionId: string;
  refillSum: number;
}

interface IGetBalanceRequest {
  userId: string;
}

export interface IGetBalanceResponse {
  total: number;
}
