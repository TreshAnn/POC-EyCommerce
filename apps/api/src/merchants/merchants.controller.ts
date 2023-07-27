import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Merchant } from './schemas/merchant.schema';

@Controller('merchant')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Public()
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMerchantDto: CreateMerchantDto) {
    const createdMerchant = await this.merchantsService.create(
      createMerchantDto,
    );
    return createdMerchant;
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Merchant> {
    return this.merchantsService.findOne(id);
  }
}
