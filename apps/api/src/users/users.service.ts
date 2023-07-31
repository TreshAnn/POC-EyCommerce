import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  // Test Data
  private readonly users = [
    {
      userId: 1,
      username: 'dancute',
      password: 'password',
    },
    {
      userId: 2,
      username: 'abubadan',
      password: 'guess',
    },
  ];

  // async findOne(username: string): Promise<userTestData | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createAuthDto = {
      userType: createUserDto.userType,
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
    };

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdAuth = await this.authService.create({
      ...createUserDto,
      password: hashedPassword,
      userType: createAuthDto.userType,
    });

    const createdUser = await this.userModel.create({
      ...createUserDto,
      auth: createdAuth,
    });

    return createdUser;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log(user);

    return user;
  }
  async findByIdAndUpdate(id: string, createUserDto: CreateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate({ _id: id }, createUserDto, { new: true });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    console.log(updatedUser);

    return updatedUser;
  }
}
