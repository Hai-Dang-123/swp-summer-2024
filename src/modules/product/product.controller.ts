import { Controller, Get, Param, Render } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  @Render('product/product-detail')
  findProduct(@Param('id') id: string) {
    return this.productService.findOne(id);
  }
}
