import { BaseEntity } from "../shared/BaseEntity";

export interface Address extends BaseEntity {
    unitNumber: string; 
    streetNumber: string; 
    addressLine1: string; 
    addressLine2?: string | null;
    city: string; 
    postalCode: string; 
    country: string; 
}
