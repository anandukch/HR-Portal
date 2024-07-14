import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    line1: string;

    @IsNotEmpty()
    @IsString()
    pincode: string;
}

export class UpdateAddressDto {
    @IsOptional()
    @IsString()
    line1: string;

    @IsOptional()
    @IsString()
    pincode: string;
}
