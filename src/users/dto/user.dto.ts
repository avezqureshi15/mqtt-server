import { IsString, IsEmail, IsOptional, MinLength, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/enum/roles.enum';

export class UserDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'The availability status of the user', required: false })
  availability: boolean;

  /**
   * The role of the user, which can be "user" or "admin"
   * @example 'user'
   */
  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ example: Role.USER, description: 'The role of the user', enum: Role, default: Role.USER })
  role?: Role = Role.USER; // Set default role as 'user'
}
