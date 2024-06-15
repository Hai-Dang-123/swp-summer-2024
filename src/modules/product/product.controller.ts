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
  // @Render('product/product-detail')
  findAll() {
    return this.productService.findAll();
  }

  @Get('latest')
  findLatest() {
    return this.productService.findLatest();
  }

  @Get('cart')
  @Render('cart/cart')
  getCart() {
    return;
  }

  @Get('home')
  // @Render('client/home')
  getHome() { }

  @Get('buy')
  //  @Render('buy/buy')
  getBuy() { }

  @Get('related/:id') 
  //56c06978-b984-44f9-aff6-ee03a0da0787
  // @Render('product/product-detail')  
  findRelatedProducts(@Param('id') id: string) {
    return this.productService.findRelatedProducts(id);
  }

  @Get(':id') //56c06978-b984-44f9-aff6-ee03a0da0787
  // @Render('product/product-detail')  
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