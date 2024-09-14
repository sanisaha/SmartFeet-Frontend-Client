import { Category } from "../category/Category";
import { SubCategoryName } from "../enums/AllEnum";
import { Product } from "../product/Product";
import { BaseEntity } from "../shared/BaseEntity";

export interface SubCategory extends BaseEntity {
    subCategoryName: SubCategoryName;  // Assuming SubCategoryName is an enum or another type
  categoryId: string;  // Guid representing the foreign key for Category
  category?: Category;  // Optional navigation property for Category
  products: Product[];  // Collection of associated products
    }