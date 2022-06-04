import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'libs/common/strategy/local.strategy';
import { JwtStrategy } from 'libs/common/strategy/jwt.strategy';
import { UserModule } from '../user/user.module';

//
@Module({
  imports: [PassportModule, forwardRef(() => UserModule)],
  providers: [LocalStrategy, JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
