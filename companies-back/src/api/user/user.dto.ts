import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public readonly nick_name?: string;

  @IsNumber()
  id: number;

  @IsString()
  @IsEmail()
  public email!: string;

  public lastLoginAt: Date | null;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string; 

  @IsString()
  description: string;

  @IsString()
  position: string;

  @IsString()
  img: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class UpdatePassword {

  @IsString()
  public oldpassword!: string;

  @IsString()
  public password!: string;

  id: number;


}
