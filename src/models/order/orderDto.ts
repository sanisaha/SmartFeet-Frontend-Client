import { OrderStatus } from "../enums/AllEnum";
import { OrderItemReadDto, OrderItemUpdateDto } from "../orderItem/orderItemDto";
import { BaseCreateDto, BaseReadDto, BaseUpdateDto } from "../shared/baseDto";
import { Order } from "./Order";

export interface OrderReadDto extends BaseReadDto<Order> {
    userId?: string | null; // Guid can be represented as string in TypeScript
    orderDate: Date;
    totalPrice: number;
    addressId?: string | null; // Nullable Guid
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    paymentMethod: string;
    orderStatus: OrderStatus; // You'll need to define this enum separately
    orderItems: OrderItemReadDto[]; // Array of OrderItemReadDto
  }

export interface OrderCreateDto extends BaseCreateDto<Order> {
    userId?: string | null;
  orderDate: string;
  totalPrice: number;
  addressId?: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  paymentMethod: string;
  orderStatus: OrderStatus;
  }

export interface OrderUpdateDto extends BaseUpdateDto<Order> {
    id: string; // Guid represented as string
  userId: string; // Non-nullable in update
  orderDate: Date;
  totalPrice: number;
  addressId: string; // Non-nullable in update
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  paymentMethod: string;
  orderStatus: OrderStatus;
  orderItems: OrderItemUpdateDto[];
  }