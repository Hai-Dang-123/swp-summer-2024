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

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  findOne(id: string): Promise<any | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    // return this.productRepository.findOneBy({ id });
  }
}
