import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CheckAbilities } from 'src/auth/ability/ability.decorator';
import { AbilityGuard } from 'src/auth/ability/ability.guard';
import { Action } from 'src/auth/ability/enum/ability.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/guards/Role.guard';
import { Role } from 'src/guards/enum/role.enum';
import { Public } from '../auth/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

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

  // this will check if the route is accessible for public or not
  // and if the user is authorized via token
  @UseGuards(AuthGuard)
  // define the type of user that can access this route
  @Roles(Role.CONSUMER)
  // check whether the user can access the route based on her pre-defines role
  @UseGuards(RolesGuard)
  // define what type of ability can the user do based on the user role
  @CheckAbilities({ action: Action.Read, subject: User })
  // @CheckAbilities({ action: Action.Update, subject: User })
  // Check whether the ability defined from the CheckAbility decorator is allowed
  @UseGuards(AbilityGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
}
