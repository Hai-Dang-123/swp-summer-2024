import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSellRequestDto } from './create-sell-request.dto';
import { SellRequestStatus, SellRequest } from 'src/entities/sell-request.entity';

@Injectable()
export class SellRequestService {
  constructor(
    @InjectRepository(SellRequest)
    private sellRequestRepository: Repository<SellRequest>,
  ) {}

  async createSellRequest(createSellRequestDto: CreateSellRequestDto): Promise<SellRequest> {
    const {watchBrand, watchName, name, phoneNumber, image, documents, priceWantToSell, status } = createSellRequestDto;

    const sellRequest = this.sellRequestRepository.create({
      watchBrand,
      watchName,
      name,
      phoneNumber,
      image,
      documents,
      priceWantToSell,
      status,
    } as Partial<SellRequest>);

    try {
      return await this.sellRequestRepository.save(sellRequest);
    } catch (error) {
      console.error('Error saving sell request:', error);
      throw new InternalServerErrorException('Failed to create sell request');
    }
  }

  async getAllSellRequests(): Promise<SellRequest[]> {
    try {
      const sellRequests = await this.sellRequestRepository.find();

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
    const sellRequest = await this.sellRequestRepository.findOne({ where: { id } });

    if (!sellRequest) {
      throw new NotFoundException('Sell request not found');
    }

    return sellRequest;
  }

  async updateSellRequest(id: number, updatedSellRequestDto: CreateSellRequestDto): Promise<SellRequest> {
    const sellRequest = await this.sellRequestRepository.findOne({ where: { id } });

    if (!sellRequest) {
      throw new NotFoundException('Sell request not found');
    }

    const {watchBrand, watchName, name, phoneNumber, image, documents, priceWantToSell, status } = updatedSellRequestDto;

    sellRequest.watchBrand = watchBrand !== undefined ? watchBrand : sellRequest.watchBrand
    sellRequest.watchName = watchName !== undefined ? watchName : sellRequest.watchName;
    sellRequest.name = name !== undefined ? name : sellRequest.name;
    sellRequest.phoneNumber = phoneNumber !== undefined ? phoneNumber : sellRequest.phoneNumber;
    sellRequest.image = image !== undefined ? image : sellRequest.image;
    sellRequest.documents = documents !== undefined ? documents : sellRequest.documents;
    sellRequest.priceWantToSell = priceWantToSell !== undefined ? priceWantToSell : sellRequest.priceWantToSell;
    sellRequest.status = status !== undefined ? status : sellRequest.status;

    try {
      await this.sellRequestRepository.save(sellRequest);
      return sellRequest;
    } catch (error) {
      console.error('Error updating sell request:', error);
      throw new InternalServerErrorException('Failed to update sell request');
    }
  }
}
