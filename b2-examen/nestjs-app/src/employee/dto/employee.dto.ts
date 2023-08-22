import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EmployeeDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDate()
    birthday: Date;

    @IsNotEmpty()
    @IsNumber()
    salary: number;

    @IsNotEmpty()
    @IsString()
    position: string;

    @IsNotEmpty()
    @IsBoolean()
    insured: boolean;

    @IsNotEmpty()
    @IsNumber()
    department: number;
}