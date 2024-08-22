import { IsString, IsEmail, MinLength, isNotEmpty, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class changePasswordDto {
  /**
   * The email of the user
   * @example 'user@example.com'
   */
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  email: string;

  /**
   * The new password for the user
   * @example 'newpassword123'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'newpassword123', description: 'The new password for the user' })
  password: string;
}
