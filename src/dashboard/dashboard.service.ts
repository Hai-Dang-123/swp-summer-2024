import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getDashboardData() {
    return {
        title: 'Dashboard',
        description: 'This is the dashboard page.',
        // Add more data as needed
        };
        }
        }