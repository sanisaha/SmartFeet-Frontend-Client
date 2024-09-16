import { ColorName } from "../enums/AllEnum";
import { Product } from "../product/Product";
import { BaseEntity } from "../shared/BaseEntity";

export interface ProductColor extends BaseEntity {
    colorName: ColorName;  // Assuming ColorName is an enum or string
    quantity: number;
    productId: string;  // Guid in C# is a string in TypeScript
    product?: Product;  // Optional navigation property
}