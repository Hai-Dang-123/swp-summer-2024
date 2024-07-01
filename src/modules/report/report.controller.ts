// report.controller.ts
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  findAllReports() {
    return this.reportService.findAllReports();
  }

  @Get(':id')
  findReportById(@Param('id') id: string) {
    return this.reportService.findReportById(id);
  }

  @Post()
  async createReport(
    @Body()
    report: {
      accountId: string;
      on: string;
      reportedId: string;
      criteria: string[];
      note?: string;
    },
  ) {
    const result = await this.reportService.createReport(report);
    if (result) {
      return result;
    } else {
      return { message: 'Failed to create new report' };
    }
  }

  @Patch(':id')
  async updateReport(
    @Param('id') id: string,
    @Body() update: { criteria?: string[]; note?: string },
  ) {
    const result = await this.reportService.updateReport(id, update);
    return result
      ? result
      : {
          message: 'Failed to update report',
        };
  }
}
