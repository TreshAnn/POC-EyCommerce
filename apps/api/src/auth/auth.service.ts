import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto, LoginDto, UpdateAuthDto } from './dto/auth.dto';
import { Auth, AuthDocument } from './schemas/auth.schema';
import { compare } from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CustomErrorService } from 'src/utils/service/custom-error.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    private jwtService: JwtService,
    private customErrorService: CustomErrorService,
  ) {}

  async findAuthId(id: string) {
    const res = await this.authModel.findOne({ _id: id });

    if (!res) {
      throw new NotFoundException(`User Id Not Found: ${res._id}`);
    }

    return res;
  }

  async findEmail(email: string) {
    return this.authModel.findOne({ email: email }).exec();
  }

  async findUserName(username: string) {
    return this.authModel.findOne({ username: username }).exec();
  }

  async signIn(rq: LoginDto) {
    const user = await this.findUserName(rq.username);
    const { isActive } = user;

    if (!isActive) {
      const createCustomError = this.customErrorService.createError(
        403,
        'Login restricted. Account is deactivated.',
      );
      return createCustomError;
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await compare(rq.password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.username,
      sub: user._id,
      role: user.userType,
    };
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

  async updateAuth(
    userId: string,
    updateAuthDto: UpdateAuthDto,
  ): Promise<Auth> {
    const updatedAuth = await this.authModel.findByIdAndUpdate(
      userId,
      updateAuthDto,
      { new: true },
    );

    if (!updatedAuth) {
      throw new NotFoundException('User not Found');
    }

    return updatedAuth;
  }

  async findOne(id: string): Promise<Auth> {
    const user = await this.authModel.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async deactivateAccount(id: string) {
    const user = await this.authModel.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.authModel.findByIdAndUpdate(
      { _id: user.id },
      { isActive: false },
      {
        new: true,
      },
    );

    return 'Account is deactivated.';
  }
}
