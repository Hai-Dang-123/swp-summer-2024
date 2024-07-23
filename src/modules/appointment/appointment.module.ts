import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentEntity } from 'src/entities/appointment.entity';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerRequestEntity } from 'src/entities/sellerRequest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity, SellerRequestEntity])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
  

