import { Controller, Post, Get, Param, Req, Res, Body, UseGuards, NotFoundException, InternalServerErrorException, Put } from '@nestjs/common';
import { SellRequestService } from './sell-request.service';
import { Request, Response } from 'express';
import { CreateSellRequestDto } from './create-sell-request.dto';
import { UserGuard } from '../auth/guards/user.guard';
import { StaffGuard } from '../auth/guards/staff.guard';


@Controller('sell-request')
export class SellRequestController {
  constructor(private readonly sellRequestService: SellRequestService) { }

  @Post('create')
  // @UseGuards(UserGuard) // Apply user guard 
  async createSellRequest(@Req() request: Request, @Res() response: Response, @Body() createSellRequestDto: CreateSellRequestDto) {


    const sellRequest = await this.sellRequestService.createSellRequest(createSellRequestDto);

    return response.status(201).json(sellRequest);
  }


  @Get('view/:role')
  async getAllSellRequestsByRole(@Param('role') role: string, @Res() res: Response): Promise<void> {
    try {
      const sellRequests = await this.sellRequestService.getAllSellRequestsByRole(role);
      console.log(sellRequests);
      if (!sellRequests) {
        throw new NotFoundException('Sell requests not found');
      }

      res.status(200).json({ sellRequests });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }

  }

  @Get(':id')
  // @UseGuards(StaffGuard) // Apply staff guard 
  async getSellRequestById(@Req() request: Request, @Res() response: Response, @Param('id') id: number) {
    const sellRequest = await this.sellRequestService.getSellRequestById(id);
    if (sellRequest) {
      response.status(200).json(sellRequest);
    } else {
      response.status(404).send('Sell request not found');
    }
  }
  @Put(':id')
  async updateSellRequest(@Param('id') id: number, @Body() updatedSellRequestDto: CreateSellRequestDto) {

    try {
      const updatedSellRequest = await this.sellRequestService.updateSellRequest(id, updatedSellRequestDto);
      return { message: 'Sell request updated successfully', sellRequest: updatedSellRequest };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update sell request');
    }
  }

}