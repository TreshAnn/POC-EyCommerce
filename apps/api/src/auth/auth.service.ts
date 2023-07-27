import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/auth.dto';
import { Auth, AuthDocument } from './schemas/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    // private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(createAuthDto: CreateAuthDto) {
    const user = await this.authModel.findOne({
      username: createAuthDto.username,
      password: createAuthDto.password,
    });
    if (user?.password !== createAuthDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

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

  async delete(emailAuth: string) {
    const deletedAuthUser = await this.authModel
      .findOneAndRemove({ email: emailAuth })
      .exec();

    if (!deletedAuthUser) {
      throw new BadRequestException('Delete failed.');
    }
    return deletedAuthUser;
  }
}
