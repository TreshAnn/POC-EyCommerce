import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { AuthService } from '../auth/auth.service';
import { extractIdFromToken } from 'src/utils/extract-token.utils';
import { JwtService } from '@nestjs/jwt';

export type userTestData = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private authService: AuthService,
    private jwtService: JwtService,
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
      password: await bcrypt.hash(createUserDto.password, 10),
    });

    return await this.userModel.create({
      ...createUserDto,
      auth: authUser,
    });
  }

  async findUser(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ 'auth._id': userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByIdAndUpdate(
    reqHeader: any,
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userId = extractIdFromToken(reqHeader, this.jwtService);

    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    const updateAuthDto = {
      username: updateUserDto.username,
      password: hashedPassword,
    };

    const updatedAuth = await this.authService.updateAuth(
      userId,
      updateAuthDto,
    );

    const updatedUserFields = {
      ...updateUserDto,
      auth: updatedAuth,
    };

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updatedUserFields,
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not updated');
    }

    return updatedUser;
  }
}
