import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class MerchantGuard extends AuthGuard implements CanActivate {
  constructor(jwtService: JwtService, reflector: Reflector) {
    super(jwtService, reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);

    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();

    const payload = request.user;

    if (payload.usertype === 'merchant') {
      return true;
    }
    throw new UnauthorizedException('Access denied for consumers');
  }
}
