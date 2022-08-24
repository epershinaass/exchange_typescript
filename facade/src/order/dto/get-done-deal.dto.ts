export class DoneDeals {
  date: string;
  sellerUserId: string;
  buyerUserId: string;
  productId: string;
  quantity: number;
  cost: number;
}

export class GetDoneDealsResponseDto {
  deals: DoneDeals[];
}

export class GetDoneDealsRequestDto {
  userId: string;
}
