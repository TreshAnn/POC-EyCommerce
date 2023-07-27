import { Body, Controller, Post } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { CreateAuthDto } from '../auth/dto/auth.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('merchant')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Public()
  @Post('create')
  async create(@Body() createMerchantDto: CreateMerchantDto) {
    const createdMerchant = await this.merchantsService.create(
      createMerchantDto,
    );
    return createdMerchant;
  }
}
