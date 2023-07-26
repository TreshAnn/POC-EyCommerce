import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { Merchant } from './schemas/merchant.schema';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectModel(Merchant.name) private readonly merchantModel: Model<Merchant>,
  ) {}

  async create(createMerchantDto: CreateMerchantDto): Promise<Merchant> {
    const usernameAlreadyExists = await this.merchantModel
      .findOne({ username: createMerchantDto.username })
      .exec();

    if (usernameAlreadyExists) {
      throw new BadRequestException('Username already exists');
    }

    const emailAlreadyExists = await this.merchantModel
      .findOne({ email: createMerchantDto.email })
      .exec();

    if (emailAlreadyExists) {
      throw new BadRequestException('Email already exists');
    }

    const createdMerchant = await this.merchantModel.create({
      ...createMerchantDto,
      userType: 'merchant',
    });

    return createdMerchant;
  }
}
