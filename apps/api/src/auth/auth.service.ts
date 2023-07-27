import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/auth.dto';
import { Auth, AuthDocument } from './schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    const usernameAlreadyExists = await this.authModel
      .findOne({ username: createAuthDto.username })
      .exec();

    if (usernameAlreadyExists) {
      throw new BadRequestException('Username already exists');
    }

    const emailAlreadyExists = await this.authModel
      .findOne({ email: createAuthDto.email })
      .exec();

    if (emailAlreadyExists) {
      throw new BadRequestException('Email already exists');
    }

    const createdAuth = await this.authModel.create(createAuthDto);
    return createdAuth;
  }
}
