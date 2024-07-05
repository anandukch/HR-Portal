import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto, UpdateAddressDto } from "./address.dto";
import { Type } from "class-transformer";
import "reflect-metadata";
import { Role } from "../utils/role.enum";

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}

export class UpdateEmployeeDto {
    @IsString()
    name: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsNumber()
    age: number;

    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    address: UpdateAddressDto;
}

export class EmployeeIdDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
