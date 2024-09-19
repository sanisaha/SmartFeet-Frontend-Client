import { UserRole } from "../enums/AllEnum";
import { BaseCreateDto, BaseReadDto, BaseUpdateDto } from "../shared/baseDto";
import { User } from "./User";

export interface UserCreateDto extends BaseCreateDto<User> {
    userName?: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role: string;  // Modify based on UserRole definition
    addressId?: string;
}
export interface UserReadDto extends BaseReadDto<User> {
    userName?: string | null; // nullable field
    email: string; // non-nullable field
    phoneNumber?: string | null; // nullable field
    role: UserRole; // non-nullable field

    fromEntity(entity: User): void; // method to populate the DTO from the entity
}

export interface UserUpdateDto extends BaseUpdateDto<User> {
    id: string; // non-nullable GUID
    userName?: string | null; // nullable field
    email: string; // non-nullable field
    phoneNumber?: string | null; // nullable field
}



