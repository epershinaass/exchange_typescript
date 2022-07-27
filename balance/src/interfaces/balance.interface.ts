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
  transactions: ITransaction[];
}

interface ICurrentBalance {
  total: number;
}

interface ITransaction {
  transactionId: string;
  currentBalance: number;
  refillSum: number;
  transactionTime: Date;
}
