import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentEntity } from 'src/entities/appointment.entity';
import { CreateAppointmentDto } from 'src/dto/appointment.dto';

@Controller('appointment')
export class AppointmentController {
   constructor(private readonly appointmentService:AppointmentService){}
   @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity> {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Get()
  async findAll(): Promise<AppointmentEntity[]> {
    return this.appointmentService.findAll();
  }
}
