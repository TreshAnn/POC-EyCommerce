import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put('deactivateAccount/:id')
  deactivateAccount(@Param('id') id: string) {
    return this.authService.deactivateAccount(id);
  }
}
