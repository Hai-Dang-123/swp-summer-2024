import { IsDate, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  sellerRequestId: number;

  @IsNumber()
  productId: number;

  @IsDate()
  scheduleDate: Date;
}