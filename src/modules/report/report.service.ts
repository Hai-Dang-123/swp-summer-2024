// report.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from 'src/entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private reportRepository: Repository<ReportEntity>,
  ) {}

  async createReport(report: any): Promise<ReportEntity> {
    return this.reportRepository.save(report);
  }

  async findAllReports(): Promise<ReportEntity[]> {
    return this.reportRepository.find({ relations: ['account'] });
  }

  async findReportById(id: string): Promise<ReportEntity> {
    return this.reportRepository.findOne({
      where: { id },
      relations: ['account'],
    });
  }

  async updateReport(id: string, update: any): Promise<any> {
    return this.reportRepository.update(id, update);
  }
}
