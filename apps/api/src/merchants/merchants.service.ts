import * as bcrypt from 'bcrypt';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { Merchant } from './schemas/merchant.schema';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectModel(Merchant.name) private readonly merchantModel: Model<Merchant>,
    private authService: AuthService,
  ) {}

  async create(createMerchantDto: CreateMerchantDto): Promise<Merchant> {
    const shopnameAlreadyExists = await this.merchantModel
      .findOne({ merchantName: createMerchantDto.merchantName })
      .exec();

    if (shopnameAlreadyExists) {
      throw new BadRequestException('Shop Name already exists');
    }

    const createAuthDto = {
      username: createMerchantDto.username,
      email: createMerchantDto.email,
      password: createMerchantDto.password,
    };

    const hashedPassword = await bcrypt.hash(createMerchantDto.password, 10);

    const createdAuth = await this.authService.create({
      ...createAuthDto,
      password: hashedPassword,
    });

    const createdMerchant = await this.merchantModel.create({
      ...createMerchantDto,
      userType: 'merchant',
    });

    return createdMerchant;
  }
}
