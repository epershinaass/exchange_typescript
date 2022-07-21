import { Injectable } from '@nestjs/common';

const BalanceBD = [
  {
    balanceId: '0',
    balance: 100,
    transactions: [],
  },
  {
    balanceId: '1',
    balance: 200,
    transactions: ['404'],
  },
  {
    balanceId: '322',
    balance: 200,
    transactions: ['123', '222'],
  },
];
@Injectable()
export class BalanceService {
  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }

  public refillBalance({ balanceId, transactionId, refillSum }): number {
    const balance = BalanceBD.find((b) => b.balanceId === balanceId);
    if (balance.transactions.find((t) => t === transactionId)) {
      return balance.balance;
    }
    return (balance.balance += Number(refillSum));
  }
}
