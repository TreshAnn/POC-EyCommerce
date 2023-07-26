import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  HttpCode,
  HttpStatus,
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Put('update/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() CreateUserDto: CreateUserDto,
  ) {
    return this.userService.updateUser(userId, CreateUserDto);
  }
}
