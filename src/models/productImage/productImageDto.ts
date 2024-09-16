import { BaseCreateDto, BaseUpdateDto } from './../shared/baseDto';
import { BaseReadDto } from "../shared/baseDto";
import { ProductImage } from "./ProductImage";

export interface ProductImageReadDto extends BaseReadDto<ProductImage> {
    productId: string;  // Guid in C# is a string in TypeScript
    imageURL: string;
    isPrimary: boolean;
    imageText?: string;  // Optional because it can be null
}

export interface ProductImageCreateDto extends BaseCreateDto<ProductImage> {
    imageURL: string;
    isPrimary: boolean;
    imageText?: string;  // Optional because it can be null
    createEntity(): ProductImage;
}

export interface ProductImageUpdateDto extends BaseUpdateDto<ProductImage> {
    id: string;           // Guid in C# is a string in TypeScript
    productId: string;   // Guid in C# is a string in TypeScript
    imageURL: string;
    isPrimary: boolean;
    imageText?: string;  // Optional because it can be null
    updateEntity(entity: ProductImage): ProductImage;
}