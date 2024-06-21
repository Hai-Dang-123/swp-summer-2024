import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import { AccountEntity } from 'src/entities/account.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}


//   async getOrderById(id: string): Promise<OrderEntity | undefined> {
    async getOrderById(id: string): Promise<OrderEntity | undefined> {
    return await this.orderRepository.findOne({
        where: { id }});
  }


  async getOrderHistory(userId: string): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      where: { user: userId },
      relations: ['user', 'voucher'], // Thay 'user' bằng tên relation giữa OrderEntity và AccountEntity trong entity definition
    });
  }

  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      relations: ['user'], // Thay 'user' bằng tên relation giữa OrderEntity và AccountEntity trong entity definition
    });
  }
}