import { BaseEntity } from './../shared/BaseEntity';
import { CategoryName } from "../enums/AllEnum";
import { SubCategory } from '../subCategory/SubCategory';

export interface Category extends BaseEntity {
  categoryName: CategoryName;
  parentCategoryId: string;
  subCategories: SubCategory[]; // Assume SubCategory type is already defined
};
