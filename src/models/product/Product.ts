import { CategoryName, SubCategoryName } from './../enums/AllEnum';
import { OrderItem } from "../orderItem/OrderItem";
import { ProductColor } from "../productColor/ProductColor";
import { ProductImage } from "../productImage/ProductImage";
import { ProductSize } from "../productSize/ProductSize";
import { Review } from "../review/Review";
import { BaseEntity } from "../shared/BaseEntity";
import { SubCategory } from "../subCategory/SubCategory";

export interface Product extends BaseEntity {
    title?: string;  // Optional, corresponds to Title in C#
    subCategoryId: string;  // Guid in C#
    description: string;  // Required
    price: number;  // Decimal in C#
    stock: number;  // Required
    brandName?: string;  // Optional
    discount?: number;  // Optional
    oldPrice?: number;  // Optional
    isFeatured: boolean;  // Required
    categoryName: CategoryName;  // Required
    subCategoryName: SubCategoryName;  // Required
    orderItems: OrderItem[];  // Assuming you have an OrderItem interface/type defined
    reviews: Review[];  // Assuming you have a Review interface/type defined
    subCategory?: SubCategory;  // Optional, assuming SubCategory is an interface/type
    productImages: ProductImage[];  // List of product images
    productSizes: ProductSize[];  // List of product sizes
    productColors: ProductColor[];  // List of product colors
    isInStock(): boolean;  // Method to check stock availability
    updateStock(quantity: number): void;  // Method to update stock
  }
  