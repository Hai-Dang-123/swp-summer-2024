import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentDto } from 'src/dto/appointment.dto';
import { AppointmentEntity } from 'src/entities/appointment.entity';
import { SellerRequestEntity } from 'src/entities/sellerRequest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async findAll(): Promise<AppointmentEntity[]> {
    return await this.appointmentRepository.find({
      order: {
        createdAt: -1,
      },
    });
  }

  async createAppointment(data: any): Promise<AppointmentEntity> {
    return await this.appointmentRepository.save(data);
  }
}
