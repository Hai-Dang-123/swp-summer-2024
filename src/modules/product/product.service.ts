import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { FindManyOptions, Not, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findAllAvailable(): Promise<ProductEntity[]> {
    return this.productRepository.find({
      where: {
        status: 'AVAILABLE',
      },
    });
  }

  async findOne(id: string): Promise<any | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
  }

  async findOneWithRelated(id: string): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const relatedProducts = await this.findRelatedProducts(id);

    return { product, relatedProducts };
  }

  async findRelatedProducts(productId: string) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    return await this.productRepository.find({
      where: [
        {
          id: Not(product.id),
          dialColor: product.dialColor,
          status: 'AVAILABLE',
        },
        {
          id: Not(product.id),
          caseMaterial: product.caseMaterial,
          status: 'AVAILABLE',
        },
        {
          id: Not(product.id),
          type: product.type,
          status: 'AVAILABLE',
        },
      ],
      take: 10,
    });
  }

  async createProduct(product: any): Promise<any> {
    return this.productRepository.save(product);
  }

  async findLatest(): Promise<any | null> {
    return this.productRepository.find({
      where: {
        status: 'AVAILABLE',
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['owner'],
      take: 8,
    });
  }

  async updateProduct(id: string, update: any): Promise<any> {
    return this.productRepository.update(id, update);
  }
}
