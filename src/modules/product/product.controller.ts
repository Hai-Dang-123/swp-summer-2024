import { Controller, Get, Param, Render, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';


export enum ProductStatus {
  IN_APPRAISAL = 'IN APPRAISAL',
  AVAILABLE = 'AVAILABLE',
  ORDERED = 'ORDERED',
  SOLD = 'SOLD',
}
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('')
  findAll() {
    return this.productService.findAll();
  }

  @Get('related/:id') 
  //56c06978-b984-44f9-aff6-ee03a0da0787
  findRelatedProducts(@Param('id') id: string) {
    return this.productService.findRelatedProducts(id);
  }

  @Get(':id') //56c06978-b984-44f9-aff6-ee03a0da0787
  findProduct(@Param('id') id: string) {
    return this.productService.findOne(id);
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
