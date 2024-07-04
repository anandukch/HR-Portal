import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    line1: string;

    @IsNotEmpty()
    @IsString()
    pincode: string;
}

export class UpdateAddressDto {
    @IsString()
    line1: string;

    @IsString()
    pincode: string;
}
