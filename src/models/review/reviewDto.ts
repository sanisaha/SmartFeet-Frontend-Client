import { BaseCreateDto, BaseReadDto, BaseUpdateDto } from "../shared/baseDto";
import { Review } from "./Review";

export interface ReviewReadDto extends BaseReadDto<Review> {
    reviewDate: Date;
    rating: number;
    reviewText?: string;  // Optional because it can be null
}
export interface ReviewCreateDto extends BaseCreateDto<Review> {
    productId: string;  // Guid in C# is a string in TypeScript
    userId: string;     // Guid in C# is a string in TypeScript
    reviewDate: Date;
    rating: number;
    reviewText: string;  // Optional because it can be null
}
export interface ReviewUpdateDto extends BaseUpdateDto<Review> {
    id: string;          // Guid in C# is a string in TypeScript
    reviewDate: Date;
    rating: number;
    reviewText?: string;  // Optional because it can be null
    updateEntity(entity: Review): Review;
}