
import { CategoryName, SubCategoryName } from "../enums/AllEnum";
import { ProductColorCreateDto, ProductColorReadDto } from "../productColor/productColorDto";
import { ProductImageCreateDto, ProductImageReadDto } from "../productImage/productImageDto";
import { ProductSizeCreateDto, ProductSizeReadDto } from "../productSize/productSizeDto";
import { ReviewReadDto } from "../review/reviewDto";

export interface ProductReadDto {
    title: string;
    description: string;
    price: number;
    stock: number;
    subCategoryId: string;  // Guid in C# is a string in TypeScript
    brandName?: string;     // Optional because it can be null
    discount?: number;      // Optional because it can be null
    oldPrice?: number;      // Optional because it can be null
    isFeatured: boolean;
    CategoryName: CategoryName;
    subCategoryName: SubCategoryName;
    productImages: ProductImageReadDto[];
    productSizes: ProductSizeReadDto[];
    productColors: ProductColorReadDto[];
    reviews: ReviewReadDto[];
}

export interface ProductCreateDto {
    title: string;
    description: string;
    price: number;
    stock: number;
    subCategoryId: string;  // Guid in C# is a string in TypeScript
    brandName?: string;     // Optional because it can be null
    discount?: number;      // Optional because it can be null
    oldPrice?: number;      // Optional because it can be null
    isFeatured: boolean;
    CategoryName?: CategoryName;
    subCategoryName?: SubCategoryName;
    productImages: ProductImageCreateDto[];
    productSizes: ProductSizeCreateDto[];
    productColors: ProductColorCreateDto[];
}

export interface ProductUpdateDto {
    id: string;              // Guid in C# is a string in TypeScript
    title: string;
    description: string;
    price: number;
    stock: number;
    subCategoryId: string;  // Guid in C# is a string in TypeScript
    brandName?: string;     // Optional because it can be null
    discount?: number;      // Optional because it can be null
    oldPrice?: number;      // Optional because it can be null
    isFeatured: boolean;
    CategoryName: CategoryName;
    subCategoryName: SubCategoryName;
}
