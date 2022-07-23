interface IRefillBalanceInfo {
  balanceId: string;
  transactionId: string;
  refillSum: number;
}

interface IError {
  error: {
    code: number;
    message: string;
  };
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
