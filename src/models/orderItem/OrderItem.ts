import { BaseEntity } from "../shared/BaseEntity";

export interface OrderItem extends BaseEntity {
    id: string;  // This corresponds to the BaseEntity ID (Guid in C#)
    orderId: string;  // Guid for the associated order
    productId: string;  // Guid for the associated product
    quantity: number;  // Quantity of the product
    price: number;  // Decimal value for the price
  }
  