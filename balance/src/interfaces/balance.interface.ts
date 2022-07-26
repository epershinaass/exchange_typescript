interface IRefillBalanceRequest {
  balanceId: string;
  transactionId: string;
  refillSum: number;
}

interface IGetBalance {
  balanceId: string;
}

interface IError {
  error: {
    code: number;
    message: string;
  };
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
