import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication') // Tagging the controller for Swagger documentation
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('signup')
  // @ApiOperation({ summary: 'Sign up a new user' })
  // @ApiResponse({ status: 201, description: 'User created successfully.' })
  // @ApiBody({ type: AuthDto })
  // async signup(@Body() dto: AuthDto, @Res() res: Response) {
  //   const result = await this.authService.signup(dto);
  //   return res.status(HttpStatus.CREATED).json(result);
  // }

  /**
   * Sign in a user.
   * @param dto - Data transfer object containing email and password.
   * @param res - Express response object.
   * @returns JWT token if credentials are valid.
   */
  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({ status: 200, description: 'Logged in successfully.' })
  @ApiResponse({ status: 400, description: 'Wrong credentials.' })
  @ApiBody({ type: AuthDto })
  async signin(@Body() dto: AuthDto, @Res() res: Response) {
    const result = await this.authService.signin(dto);
    return res.status(HttpStatus.OK).json(result);
  }
}
