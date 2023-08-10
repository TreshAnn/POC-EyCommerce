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
  ConsumerAbility,
  MerchantAbility,
} from 'src/auth/ability/ability.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { AbilityGuard } from 'src/auth/ability/ability.guard';

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
  @CheckAbilities(new ConsumerAbility())
  // Check whether the ability defined from the CheckAbility decorator is allowed
  @UseGuards(AbilityGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
}
