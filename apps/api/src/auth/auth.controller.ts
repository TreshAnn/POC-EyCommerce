import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Body() createAuthDto: CreateAuthDto) {
    await this.authService.create(createAuthDto);
  }
}
