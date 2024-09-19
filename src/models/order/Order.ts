import { Address } from "../address/Address";
import { OrderStatus } from "../enums/AllEnum";
import { OrderItem } from "../orderItem/OrderItem";
import { BaseEntity } from "../shared/BaseEntity";
import { User } from "../user/User";

export interface Order extends BaseEntity {
    orderDate: Date; // non-nullable Date
    totalPrice: number; // non-nullable decimal represented as number in TypeScript
    orderStatus: OrderStatus; // non-nullable enum

    userId?: string | null; // nullable GUID, represented as a string
    addressId?: string | null; // nullable GUID, represented as a string

    // Navigation Properties
    orderItems: OrderItem[]; // non-nullable collection of OrderItems
    user?: User | null; // nullable User reference
    address?: Address | null; // nullable Address reference

    // Methods would typically be implemented in a class, but are omitted for interfaces
}
