import { Controller, Get, Param, Render, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
// import { AuthGuard } from '@nestjs/passport';
import { OrderEntity } from 'src/entities/order.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';


@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('/history/:userId')
    getOrderHistory(@Param('userId') userId: string) {
        return this.orderService.getOrderHistory(userId);
    }
//   @Get(':id') 
//   findProduct(@Param('id') id: string) {
//     return this.productService.findOne(id);
//   }

    @Get('all')
    async getAllOrders() {
    return await this.orderService.getAllOrders();
    }

    @Get(':id')
     getOrderById(@Param('id') id: string) {
        return this.orderService.getOrderById(id);
    }


}