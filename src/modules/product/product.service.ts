  import { Injectable, NotFoundException } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { ProductEntity } from '../../entities/product.entity';
  import { BaseService } from 'src/common/base/service.base';



  @Injectable()
  export class ProductService extends BaseService<ProductEntity> {
    constructor(
      @InjectRepository(ProductEntity)
      private readonly productRepository: Repository<ProductEntity>,
    ) {
      super(productRepository);
    }

    async getProductDetail(id: string): Promise<ProductEntity> {
      
      try {
        const product = await this.getOne(id);
        
        if (!product) {
          console.error('Error fetching product detail in ProductService:');
          throw new NotFoundException('Product not found');
        }
        return product;
      } catch (error) {
        console.error('Error:', error);
        throw new NotFoundException('Product not found');
      }
    }

    async getAll(): Promise<ProductEntity[]> {
      try {
        const products = await this.repo.find();
        return products;
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Error retrieving products');
      }
    }
  }
