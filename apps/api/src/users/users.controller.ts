import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { User } from './schemas/user.schema';
import { RolesGuard } from 'src/guards/Role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/guards/enum/role.enum';
import {
  CheckAbilities,
  MerchantAbility,
} from 'src/auth/ability/ability.decorator';

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

  @HttpCode(HttpStatus.OK)
  @Put('update/:id')
  async findByIdAndUpdate(
    @Body() createUserDto: CreateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.userService.findByIdAndUpdate(id, createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
}
