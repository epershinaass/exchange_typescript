import { Injectable } from '@nestjs/common';

@Injectable()
export class BalanceService {
  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }
}
