// product.controller.ts
import { Controller, Get, Param, NotFoundException, Render, Res, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity, ProductStatus } from '../../entities/product.entity';
import { Response } from 'express'; // Import Response để sử dụng để render view
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Controller('product')
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

  @Post()
  async createProduct(
    @Body()
    product: {
      owner: UUID;
      name: string;
      brand: string;
      price: number;
      description: string;
      type: string;
      image: string;
      dialColor: string;
      box: boolean;
      papers: boolean;
      waterResistance: number;
      caseMaterial: string;
      caseSize: number;
      pastUsageTime: string;
      yearOfProduction: string;
      remainingInsurance: string;
      status: ProductStatus;
    },
  ) {
    const result = this.productService.createProduct(product);
    if (result) {
      return result;
    } else {
      return { message: 'Failed to create new product' };
    }
  }



}
