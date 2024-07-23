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
        @InjectRepository(SellerRequestEntity)
        private sellerRequestRepository: Repository<SellerRequestEntity>,
      ) {}
      async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity> {
        const newAppointment = this.appointmentRepository.create(createAppointmentDto);
        await this.appointmentRepository.save(newAppointment);
        if (newAppointment.account) {
          await this.sellerRequestRepository.update(
            newAppointment.account.id, 
            { status: 'scheduled' }
          );
        }
    
        return newAppointment;
      }
    
      async findAll(): Promise<AppointmentEntity[]> {
        return this.appointmentRepository.find({ relations: ["sellerRequest", "product"] });
      }
    
}
