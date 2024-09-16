import { Product } from "../product/Product";
import { BaseEntity } from "../shared/BaseEntity";

export interface ProductImage extends BaseEntity {
    productId: string;  // Guid in C# is a string in TypeScript
    imageURL?: string;  // Optional because it can be null
    isPrimary: boolean;
    imageText?: string;  // Optional because it can be null
    product?: Product;  // Optional navigation property
}