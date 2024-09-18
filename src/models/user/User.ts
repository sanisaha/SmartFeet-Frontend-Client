import { Address } from "../address/Address";
import { UserRole } from "../enums/AllEnum";
import { Order } from "../order/Order";
import { Review } from "../review/Review";
import { BaseEntity } from "../shared/BaseEntity";

export interface User extends BaseEntity {
    userName: string;
    email: string;
    password?: string;
    salt: Uint8Array;
    phoneNumber: string;
    role: UserRole;
    addressId?: string;
    reviews?: Review[];
    orders?: Order[];
    address?: Address;
}