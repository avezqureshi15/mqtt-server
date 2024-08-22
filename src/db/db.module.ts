import { Module } from '@nestjs/common';
import { AuthDbService } from './auth/auth-db.service';
import { AuthDbRepository } from './auth/auth-db.repository';
import { UsersDbRepository } from './users/users-db.repository';
import { UsersDbService } from './users/users-db.service';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { jwtSecret } from 'src/common/utils/constants';
@Module({
  imports: [
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [],
  providers: [
    RolesGuard,
    AuthDbService,
    AuthDbRepository,
    UsersDbService,
    UsersDbRepository,
  ],
  exports: [
    AuthDbService,
    AuthDbRepository,
    UsersDbService,
    UsersDbRepository,
  ],
})
export class DbModule { }
