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
}
