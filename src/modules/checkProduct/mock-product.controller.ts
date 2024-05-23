import { Controller, Get, Query } from '@nestjs/common';
import { MockProductService } from './mock-product.service'; // Service cho data mẫu

@Controller('products')
export class ProductController {
  constructor(
    private readonly mockProductService: MockProductService,
  ) {}

  @Get()
  async getProducts(@Query('mock') mock: string) {
    if (mock === 'true') {
      return this.mockProductService.getMockProducts();
    }
    
    return []; 
  }
}
