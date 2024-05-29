import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<any | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
  }

  async createProduct(product: any): Promise<any> {
    return this.productRepository.save(product);
  }

  async updateProduct(update: any): Promise<any> {
    
  }
}
