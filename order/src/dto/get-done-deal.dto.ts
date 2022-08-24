export class GetDoneDealsResponseDto {
  deals: DoneDeal;
}

export class DoneDeal {
  date: string;
  sellerUserId: string;
  buyerUserId: string;
  productId: string;
  quantity: number;
  cost: number;
}

export class GetDoneDealsRequestDto {
  userId: string;
}
