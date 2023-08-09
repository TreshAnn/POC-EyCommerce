import * as bcrypt from 'bcrypt';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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
      usertype: createMerchantDto.userType,
      username: createMerchantDto.username,
      email: createMerchantDto.email,
      password: createMerchantDto.password,
      isActive: true,
    };

    const hashedPassword = await bcrypt.hash(createMerchantDto.password, 10);

    const createdAuth = await this.authService.create({
      ...createAuthDto,
      password: hashedPassword,
      userType: createAuthDto.usertype,
    });

    const createdMerchant = await this.merchantModel.create({
      ...createMerchantDto,
      auth: createdAuth,
    });

    return createdMerchant;
  }

  async findOne(id: string): Promise<Merchant> {
    const merchant = await this.merchantModel.findOne({ _id: id });

    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    //console.log(merchant);

    return merchant;
  }
  async findByIdAndUpdate(
    id: string,
    createMerchantDto: CreateMerchantDto,
  ): Promise<Merchant> {
    const updatedMerchant = await this.merchantModel.findByIdAndUpdate(
      { _id: id },
      createMerchantDto,
      { new: true },
    );

    if (!updatedMerchant) {
      throw new NotFoundException('User not found');
    }

    console.log(updatedMerchant);

    return updatedMerchant;
  }
}
