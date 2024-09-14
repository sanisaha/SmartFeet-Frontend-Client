import { ColorName } from "../enums/AllEnum";
import { BaseCreateDto, BaseReadDto, BaseUpdateDto } from "../shared/baseDto";
import { ProductColor } from "./ProductColor";

export interface ProductColorReadDto extends BaseReadDto<ProductColor> {
    productId: string;  // Guid in C# is a string in TypeScript
    colorName: string;  // Assuming colorName is a string representation
}
export interface ProductColorCreateDto extends BaseCreateDto<ProductColor> {
    colorName: ColorName;  // Assuming ColorName is an enum or string
    createEntity(): ProductColor;
}
export interface ProductColorUpdateDto extends BaseUpdateDto<ProductColor> {
    id: string;          // Guid in C# is a string in TypeScript
    productId: string;  // Guid in C# is a string in TypeScript
    colorName: string;  // Assuming colorName is a string representation
    updateEntity(entity: ProductColor): ProductColor;
}