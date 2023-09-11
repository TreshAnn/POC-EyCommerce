import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    // TEMPORARY FIX FOR PUBLIC ROUTE
    if (!req.headers.authorization) return next();
    const token = this.extractTokenFromHeader(req.headers.authorization);
    if (!token) {
      next();
      return;
    }
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      if (user) {
        req['user'] = user;
        const { userType, _id } = await this.authService.findUserName(
          user.username,
        );
        req['_id'] = _id;
        req['userType'] = userType;
      }
    } catch (error) {
      throw new UnauthorizedException('Token expired.');
    }
    next();
  }

  private extractTokenFromHeader(request: string): string | undefined {
    const [type, token] = request.split(' ') ?? [];
    return token;
  }
}
