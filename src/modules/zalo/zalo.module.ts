import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZaloPayService } from './zalo.service';
import { SocketService } from './zalopay.client';
import { AuthModule } from '../auth/auth.module';
import { ZaloPayEntity } from './zalo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ZaloPayEntity]),
    AuthModule,
  ],
  providers: [
    SocketService,
    {
      provide: 'ZALOPAY_SERVICE_TIENNT',
      useClass: ZaloPayService,
    },
  ],
  exports: [
    {
      provide: 'ZALOPAY_SERVICE_TIENNT',
      useClass: ZaloPayService,
    }
  ],
})
export class ZaloPayModule { }
