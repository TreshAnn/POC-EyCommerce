import { Body, Controller, Post } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('merchant')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Public()
  @Post('create')
  async create(@Body() createMerchantDto: CreateMerchantDto) {
    await this.merchantsService.create(createMerchantDto);
  }
}
