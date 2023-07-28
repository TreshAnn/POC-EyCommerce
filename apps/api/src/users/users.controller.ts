import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  Put,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { Public } from '../auth/decorators/public.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto);
    return createdUser;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Put('disableAccount/:id')
  async disableUser(@Param('id') userId: string) {
    return this.userService.disableUserById(userId);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Put('enableAccount/:id')
  async enableUser(@Param('id') userId: string) {
    return this.userService.enableUserById(userId);
  }
}
