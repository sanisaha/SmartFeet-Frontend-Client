import { SizeValue } from "../enums/AllEnum";
import { BaseCreateDto, BaseReadDto, BaseUpdateDto } from "../shared/baseDto";
import { ProductSize } from "./ProductSize";

export interface ProductSizeReadDto extends BaseReadDto<ProductSize> {
    productId: string;  // Guid in C# is a string in TypeScript
    sizeValue: SizeValue;  // Assuming SizeValue is an enum or string
    quantity: number;
}
export interface ProductSizeCreateDto extends BaseCreateDto<ProductSize> {
    sizeValue: SizeValue;  // Assuming SizeValue is an enum or string
    quantity: number;
    createEntity(): ProductSize;
}
export interface ProductSizeUpdateDto extends BaseUpdateDto<ProductSize> {
    id: string;          // Guid in C# is a string in TypeScript
    productId: string;  // Guid in C# is a string in TypeScript
    sizeValue: SizeValue;  // Assuming SizeValue is an enum or string
    quantity: number;
    updateEntity(entity: ProductSize): ProductSize;
}
