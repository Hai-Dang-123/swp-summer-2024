// sell-request.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSellRequestDto } from './create-sell-request.dto';
import { SellRequest } from 'src/entities/sell-request.entity';

@Injectable()
export class SellRequestService {
  constructor(
    @InjectRepository(SellRequest)
    private sellRequestRepository: Repository<SellRequest>,
  ) {}

  async createSellRequest(userId: string, createSellRequestDto: CreateSellRequestDto): Promise<SellRequest> {
    // Xử lý và lưu thông tin từ DTO vào cơ sở dữ liệu
    const sellRequest = new SellRequest();
    sellRequest.userId = userId; // Gán người dùng tạo request
    sellRequest.address = createSellRequestDto.address;
    sellRequest.sellForm = createSellRequestDto.sellForm;
    sellRequest.watchForm = createSellRequestDto.watchForm;
    // Lưu sellRequest vào cơ sở dữ liệu
    return await this.sellRequestRepository.save(sellRequest);
  }

  async getAllSellRequestsByRole(role: string): Promise<SellRequest[]> {
    // Lấy danh sách sell request dựa trên vai trò của nhân viên
    return await this.sellRequestRepository.find({ where: { role } });
  }

  async getSellRequestById(id: number): Promise<SellRequest> {
    // Lấy một sell request cụ thể dựa trên ID
    return await this.sellRequestRepository.findOne({ where: { id } });
}


}


