import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass,
    ]);

    if (isPublic) return true;

    const role = this.reflector.getAllAndOverride<string>('role', [
      context.getHandler(),
      context.getClass,
    ]);

    const request = await context.switchToHttp().getRequest();
    const userType = request['userType'];

    if (userType === role) return true;

    return false;
  }
}
