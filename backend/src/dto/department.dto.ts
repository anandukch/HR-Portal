import { IsNotEmpty, IsString } from "class-validator";

export class CreateDepartmentDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class DepartmentResponseDto {
    id: number;
    name: string;

    constructor(department: DepartmentResponseDto) {
        this.id = department.id;
        this.name = department.name;
    }
}
