// create-sell-request.dto.ts

import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { SellRequestStatus } from 'src/entities/sell-request.entity';



export class CreateSellRequestDto {

  @IsString()
  watchBrand: string;

  @IsString()
  watchName: string;

  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  documents?: string;

  @IsString()
  image: string;

  @IsNumber()
  priceWantToSell: number;


  @IsEnum(SellRequestStatus)
  status: SellRequestStatus;
}
