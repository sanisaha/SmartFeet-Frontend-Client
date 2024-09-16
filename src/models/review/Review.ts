import { BaseEntity } from "../shared/BaseEntity";

export interface Review extends BaseEntity {
    id: string;  // This corresponds to the BaseEntity ID (Guid in C#)
    productId: string;  // Guid for the associated product
    userId: string;  // Guid for the associated user
    reviewDate: Date;  // The date of the review
    rating: number;  // Rating out of some value (1-5 typically)
    reviewText?: string;  // Optional review text
  
    // Optional navigation properties
  }
  