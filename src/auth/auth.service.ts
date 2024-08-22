import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDbService } from '../db/auth/auth-db.service';
import { AuthDto } from './dto/auth.dto';
import { comparePasswords, signToken } from './helpers/auth.helpers';
import { JwtService } from '@nestjs/jwt';
import { ResponseUtil } from '../common/response/response.util';

@Injectable()
export class AuthService {
  constructor(private authDbService: AuthDbService, private jwt: JwtService) {}

  /**
   * Handles user sign-in.
   * @param dto - Data transfer object containing email and password.
   * @returns JWT token if credentials are valid.
   * @throws BadRequestException if credentials are wrong.
   * @throws ForbiddenException if token generation fails.
   */
  async signin(dto: AuthDto) {
    const { email, password } = dto;

    const foundUser = await this.authDbService.findUserByEmail(email);
    if (!foundUser) {
      throw new BadRequestException(ResponseUtil.error('Wrong credentials', 400));
    }

    const compareSuccess = await comparePasswords({
      password,
      hash: foundUser.password,
    });
    if (!compareSuccess) {
      throw new BadRequestException(ResponseUtil.error('Wrong credentials', 400));
    }

    const token = await signToken(this.jwt, {
      userId: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    });

    if (!token) {
      throw new ForbiddenException(ResponseUtil.error('Could not sign in', 403));
    }

    return ResponseUtil.success(
      { token, email: foundUser.email, name: foundUser.name, role: foundUser.role },
      'Logged in successfully'
    );
  }
}
