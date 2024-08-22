import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DbModule } from '../db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from '../common/utils/constants';
import { RolesGuard } from '../auth/guards/role.guard';

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, RolesGuard],
})
export class UsersModule { }
