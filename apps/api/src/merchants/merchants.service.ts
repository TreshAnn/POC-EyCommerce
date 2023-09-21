import * as bcrypt from 'bcrypt';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateMerchantDto,
  UpdateMerchantDto,
} from './dto/create-merchant.dto';
import { Merchant, MerchantDocument } from './schemas/merchant.schema';
import { AuthService } from '../auth/auth.service';
import { extractIdFromToken } from 'src/utils/extract-token.utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectModel(Merchant.name) private readonly merchantModel: Model<Merchant>,
    private authService: AuthService,
    private jwtService: JwtService,
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
  async findAllMerchants(): Promise<Merchant[]> {
    return this.merchantModel.find();
  }
  async findOne(id: string): Promise<MerchantDocument> {
    const merchant = await this.merchantModel.findOne({ 'auth._id': id });

    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    return merchant;
  }
  async findMerchantInModel(id: string): Promise<MerchantDocument> {
    const merchant = await this.merchantModel.findOne({ _id: id });

    if (!merchant) {
      throw new NotFoundException('No merchant data');
    }

    return merchant;
  }

  async findByIdAndUpdate(
    reqHeader: any,
    id: string,
    updateMerchantDto: UpdateMerchantDto,
  ): Promise<Merchant> {
    const userId = extractIdFromToken(reqHeader, this.jwtService);

    const hashedPassword = await bcrypt.hash(updateMerchantDto.password, 10);
    const updateAuthDto = {
      username: updateMerchantDto.username,
      password: hashedPassword,
    };

    const updatedAuth = await this.authService.updateAuth(
      userId,
      updateAuthDto,
    );
    const updatedMerchantFields = {
      ...updateMerchantDto,
      auth: updatedAuth,
    };

    const updatedMerchant = await this.merchantModel.findByIdAndUpdate(
      id,
      updatedMerchantFields,
      { new: true },
    );

    if (!updatedMerchant) {
      throw new NotFoundException('Merchant not updated');
    }

    return updatedMerchant;
  }
}
