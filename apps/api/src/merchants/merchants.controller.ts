import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Merchant } from './schemas/merchant.schema';
import { RolesGuard } from 'src/guards/Role.guard';
import { AbilityGuard } from 'src/auth/ability/ability.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { CheckAbilities } from 'src/auth/ability/ability.decorator';
import { Action } from 'src/auth/ability/enum/ability.enum';
import { Role } from 'src/guards/enum/role.enum';

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
  @Get('get-all-merchant')
  @HttpCode(HttpStatus.OK)
  async findAllMerchants(): Promise<Merchant[]> {
    return this.merchantsService.findAllMerchants();
  }

  @UseGuards(AuthGuard, RolesGuard, AbilityGuard)
  @Roles(Role.MERCHANT)
  @CheckAbilities({ action: Action.Read, subject: Merchant })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Merchant> {
    return this.merchantsService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard, AbilityGuard)
  @Roles(Role.MERCHANT)
  @CheckAbilities({ action: Action.Update, subject: Merchant })
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async findByIdAndUpdate(
    @Body() createMerchantDto: CreateMerchantDto,
    @Param('id') id: string,
  ): Promise<Merchant> {
    return this.merchantsService.findByIdAndUpdate(id, createMerchantDto);
  }
}
