import { SizeValue } from "../enums/AllEnum";
import { Product } from "../product/Product";
import { BaseEntity } from "../shared/BaseEntity";

export interface ProductSize extends BaseEntity {
    productId: string;  // Guid in C# is a string in TypeScript
    sizeValue: SizeValue;  // Assuming SizeValue is an enum or string
    quantity: number;
    product?: Product;  // Optional navigation property
}