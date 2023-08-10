import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { AuthService } from '../auth/auth.service';

export type userTestData = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createAuthDto = {
      userType: createUserDto.userType,
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      isActive: true,
    };

    const authUser = await this.authService.create({
      ...createAuthDto,
      password: await hash(createUserDto.password, 10),
    });

    return await this.userModel.create({
      ...createUserDto,
      auth: authUser,
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log(user);

    return user;
  }

  async findByIdAndUpdate(
    id: string,
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: id },
      createUserDto,
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    console.log(updatedUser);

    return updatedUser;
  }
}
