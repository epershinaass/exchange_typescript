import {Injectable} from "@nestjs/common";
type ProductResponse = { product_id: number, name: string, quantity: number }

@Injectable()
export class ProductsService {
    public accumulate(userId: {id: number}): ProductResponse[] {
        return UserProducts[userId.id];
    }
}

const UserProducts = {
    1: [
        {product_id: 1000, name: "HI", quantity: 1},
        {product_id: 1001, name: "HI2", quantity: 1}
    ],
    2: [
        {product_id: 1000, name: "HI1", quantity: 1},
        {product_id: 1001, name: "HI21", quantity: 1}
    ]
};



