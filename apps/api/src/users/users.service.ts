import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { AuthService } from '../auth/auth.service';

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
    };

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    await this.authService.create({
      ...createUserDto,
      password: hashedPassword,
      userType: createAuthDto.userType,
    });

    const createdUser = await this.userModel.create({
      ...createUserDto,
    });

    return createdUser;
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }
}
