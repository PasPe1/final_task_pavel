import { Trim } from 'class-sanitizer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CompanyDto {

    @IsNotEmpty()
    profile_id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    adress: string;

    @IsNotEmpty()
    service: string;

    @IsNotEmpty()
    employeesCount: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    type: string;
}