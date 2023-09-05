import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UnauthorizedException, Injectable } from '@nestjs/common';

//Temporary token extractor and decoder for testing
export function extractIdFromToken(
  request: Request,
  jwtService: JwtService,
): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  if (type === 'Bearer') {
    try {
      const decoded = jwtService.decode(token) as { sub: string };
      if (decoded && decoded.hasOwnProperty('sub')) {
        const userID = decoded.sub;
        return userID;
      } else {
        throw new UnauthorizedException('Invalid token or missing user ID');
      }
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  } else {
    return undefined;
  }
}
