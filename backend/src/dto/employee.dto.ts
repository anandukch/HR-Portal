import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto, UpdateAddressDto } from "./address.dto";
import { Type } from "class-transformer";
import "reflect-metadata";
import { Role } from "../utils/role.enum";
import Employee from "../entity/employee.entity";

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

    @IsNotEmpty()
    @IsString()
    departmentName: string;

    @IsNotEmpty()
    @IsNumber()
    experience: number;

    @IsNotEmpty()
    @IsString()
    status: string;
}

export class UpdateEmployeeDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsString()
    @IsOptional()
    email: string;

    @IsNumber()
    @IsOptional()
    age: number;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    address: UpdateAddressDto;

    @IsOptional()
    @IsEnum(Role)
    role: Role;

    @IsOptional()
    @IsString()
    departmentName: string;

    @IsOptional()
    @IsNumber()
    experience: number;

    @IsOptional()
    @IsString()
    status: string;
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

export class PasswordResetDto {
    @IsNotEmpty()
    @IsString()
    currentPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}

export class EmployeeResposneDto {
    password: string;

    public constructor(employee: Employee) {
        Object.assign(this, employee);
        delete this.password;
    }
}
