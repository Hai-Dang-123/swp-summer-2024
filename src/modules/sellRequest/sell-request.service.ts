import { Injectable, HttpException, HttpStatus, Inject, NotFoundException } from '@nestjs/common';
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

  async createSellRequest(createSellRequestDto: CreateSellRequestDto): Promise<SellRequest> {
    // Create sell request
    const sellRequest = new SellRequest();
    sellRequest.role = createSellRequestDto.role;
    sellRequest.address = createSellRequestDto.address;
    sellRequest.sellForm = createSellRequestDto.sellForm;
    sellRequest.watchForm = createSellRequestDto.watchForm;

    // Save sell request
    return await this.sellRequestRepository.save(sellRequest);
  }

  async getAllSellRequestsByRole(role: string): Promise<SellRequest[]> {
    try {
      const sellRequests = await this.sellRequestRepository.find({ where: { role } });
      
      if (!sellRequests || sellRequests.length === 0) {
        throw new NotFoundException('Sell requests not found');
      }

      return sellRequests;
    } catch (error) {
      console.error('Error fetching sell requests in SellRequestService:', error);
      throw new NotFoundException('Sell requests not found');
    }
  }

  async getSellRequestById(id: number): Promise<SellRequest> {
    // Get sell request by id
    return await this.sellRequestRepository.findOne({ where: { id } });
  }
  async updateSellRequest(id: number, updatedSellRequestDto: CreateSellRequestDto): Promise<SellRequest> {
    // Xử lý logic cập nhật dựa trên id và updatedSellRequestDto
    const sellRequest = await this.sellRequestRepository.findOne({where: { id}});
    if (!sellRequest) {
        throw new NotFoundException('Sell request not found');
    }

    // Áp dụng các thay đổi từ updatedSellRequestDto vào sellRequest
    if (updatedSellRequestDto.sellForm) {
        sellRequest.sellForm = { ...sellRequest.sellForm, ...updatedSellRequestDto.sellForm };
    }
    if (updatedSellRequestDto.watchForm) {
        sellRequest.watchForm = { ...sellRequest.watchForm, ...updatedSellRequestDto.watchForm };
    }
    if (updatedSellRequestDto.address) {
        sellRequest.address = updatedSellRequestDto.address;
    }

    // Lưu sellRequest đã được cập nhật
    await this.sellRequestRepository.save(sellRequest);

    return sellRequest;
}

}
