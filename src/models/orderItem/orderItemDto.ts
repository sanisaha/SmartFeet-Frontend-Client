import { BaseCreateDto, BaseReadDto, BaseUpdateDto } from "../shared/baseDto";
import { OrderItem } from "./OrderItem";

export interface OrderItemReadDto extends BaseReadDto<OrderItem> {
    orderId: string; // Guid as string
    productId: string; // Guid as string
    quantity: number;
    price: number;
  }

export interface OrderItemCreateDto extends BaseCreateDto<OrderItem> {
    orderId: string; // Guid as string
    productId: string; // Guid as string
    quantity: number;
    price: number;
  }

export interface OrderItemUpdateDto extends BaseUpdateDto<OrderItem> {
    id: string; // Guid as string
    orderId: string; // Guid as string
    productId: string; // Guid as string
    quantity: number;
}
  