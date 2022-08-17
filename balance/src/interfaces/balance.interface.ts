interface IRefillBalanceRequest {
  userId: string;
  transactionId: string;
  refillSum: number;
}

interface IGetBalance {
  userId: string;
}

interface IBalance {
  total: number;
  frozen: number;
  transactions: ITransaction[];
}

interface ICurrentBalance {
  total: number;
}

interface ITransaction {
  transactionId: string;
  refillSum: number;
  transactionTime: Date;
}
