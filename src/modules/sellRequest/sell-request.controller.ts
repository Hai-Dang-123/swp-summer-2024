// sell-request.controller.ts
import { Controller, Post, Get, Param, Query, UseGuards, Req, Res, NotFoundException, Body } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { SellRequestService } from './sell-request.service';
import { CreateSellRequestDto } from './create-sell-request.dto';
// import { JwtAuthGuard } from './jwt-auth.guard'; // Import JwtAuthGuard để sử dụng middleware xác thực JWT

@Controller('sell-request')
export class SellRequestController {
  constructor(private readonly sellRequestService: SellRequestService) {}

  // Tạo một sell request mới và lưu vào cơ sở dữ liệu
  @Post()
  async createSellRequest(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createSellRequestDto: CreateSellRequestDto
  ) {
    const user = request['user'];
    if (user) {
      const sellRequest = await this.sellRequestService.createSellRequest(user.id, createSellRequestDto);
      return response.status(201).json({ message: 'Sell request created successfully', sellRequest });
    } else {
      return response.status(401).send('Unauthorized');
    }
  }

  // Lấy danh sách tất cả các sell request dựa trên vai trò của nhân viên.
//   @UseGuards(JwtAuthGuard)
  @Get()
  async getAllSellRequestsByRole(@Req() request: Request) {
    const user = request['user'];
    if (user) {
      const sellRequests = await this.sellRequestService.getAllSellRequestsByRole(user.role); // Lấy danh sách sell request dựa trên vai trò của nhân viên
      return { sellRequests };
    } else {
      return response.status(401).send('Unauthorized');
    }
  }

  // Lấy một sell request cụ thể dựa trên ID.
//   @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSellRequestById(@Param('id') id: number) {
    const sellRequest = await this.sellRequestService.getSellRequestById(id);
    if (sellRequest) {
      return sellRequest;
    } else {
      throw new NotFoundException('Sell request not found');
    }
  }

  // Bổ sung các endpoint khác cần thiết cho việc lấy và sửa sellRequest
}
