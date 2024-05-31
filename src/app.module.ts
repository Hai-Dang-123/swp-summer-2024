import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPE_ORM_CONFIG } from './config/orm.config';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/auth/auth.module';
import { StaffModule } from './modules/staff/staff.module';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SearchModule } from './search/search.module';
import { BuyModule } from './buy/buy.module';



import { CartModule } from './modules/cart/cart.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPE_ORM_CONFIG),
    ScheduleModule.forRoot(),
    AuthModule,
    AdminModule,
    ClientModule,
    StaffModule,
    DashboardModule,
    SearchModule,
    BuyModule,
  
    CartModule,
    ProductModule,
  ],
  providers: [],
})
export class AppModule {}
