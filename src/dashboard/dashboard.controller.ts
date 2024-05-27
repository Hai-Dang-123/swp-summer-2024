import { Controller, Get, Render } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @Render('admin/dashboard')
  getDashboard() {
    const data = this.dashboardService.getDashboardData();
    return { data };
  }
}
