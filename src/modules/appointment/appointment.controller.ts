import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentEntity } from 'src/entities/appointment.entity';
import { CreateAppointmentDto } from 'src/dto/appointment.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async findAll(): Promise<AppointmentEntity[]> {
    return this.appointmentService.findAll();
  }

  @Post()
  async createAppointment(
    @Body()
    data: {
      account: UUID;
      product: UUID;
      date: string;
      status: string;
    },
  ): Promise<AppointmentEntity> {
    return this.appointmentService.createAppointment(data);
  }

  @Patch(':id')
  async updateAppointment(
    @Param('id') id: string,
    @Body()
    updates: {
      account: string;
      product: string;
      date: string;
      status: string;
    },
  ) {
    return this.appointmentService.updateAppointment(updates, id);
  }
}
