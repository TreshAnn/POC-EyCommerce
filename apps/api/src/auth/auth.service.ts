import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto, LoginDto } from './dto/auth.dto';
import { Auth, AuthDocument } from './schemas/auth.schema';
import { compare } from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    private jwtService: JwtService,
  ) {}

  async findEmail(email: string) {
    return this.authModel.findOne({ email: email }).exec();
  }

  async findUserName(username: string) {
    return this.authModel.findOne({ username: username }).exec();
  }

  async signIn(rq: LoginDto) {
    const user = await this.findUserName(rq.username);

    if (!(await compare(rq.password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    if (await this.findUserName(createAuthDto.username)) {
      throw new BadRequestException('Username already exists');
    }

    if (await this.findEmail(createAuthDto.email)) {
      throw new BadRequestException('Email already exists');
    }

    return await this.authModel.create(createAuthDto);
  }
}
