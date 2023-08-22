import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DepartmentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    budget: number;

    @IsNotEmpty()
    @IsBoolean()
    active: boolean;

    @IsNotEmpty()
    @IsString()
    location: string;
}