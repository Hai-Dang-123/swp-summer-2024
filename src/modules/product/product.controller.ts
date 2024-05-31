// product.controller.ts
import { Controller, Get, Param, NotFoundException, Render, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from '../../entities/product.entity';
import { Response } from 'express'; // Import Response để sử dụng để render view

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async getAllProducts(): Promise<ProductEntity[]> {
    try {
      return await this.productService.getAll();
    } catch (error) {
      console.error('Error:', error);
      throw new NotFoundException('Error retrieving products');
    }
  }

  @Get('/:id')
  async getProductDetail(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const product = await this.productService.getProductDetail(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
    
      res.render('viewDetailProduct', { product }); // Render viewDetailProduct với dữ liệu sản phẩm
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch product details');
    }
  }

  



}
