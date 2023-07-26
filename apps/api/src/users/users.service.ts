import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if Username already exists in the database
    const usernameAlreadyExists = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();

    if (usernameAlreadyExists) {
      throw new BadRequestException('Username already exists');
    }

    // Check if Email already exists in the database
    const emailAlreadyExists = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();

    if (emailAlreadyExists) {
      throw new BadRequestException('Email already exists');
    }

    const createdUser = await this.userModel.create({
      ...createUserDto,
      userType: 'consumer',
    });
    return createdUser;
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }
  async updateUser(
    userId: string,
    CreateUserDto: CreateUserDto,
  ): Promise<User> {
    const existingUser = await this.userModel.findById(userId);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Update only the fields that are present in the updateUserDto
    Object.assign(existingUser, CreateUserDto);

    const updatedUser = await existingUser.save();
    return updatedUser;
  }
}
