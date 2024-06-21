import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { ProductStatus } from './product.controller';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) { }


  //sản phẩm liên quan trung thêm nè
  async findRelatedProducts(productId) {
    const product = await this.productRepository.findOne({
      where: [{
        id: productId

      },]
    });
    if (!product) {
      throw new Error('Product not found');
    }

    return await this.productRepository.find({
      where: [{
        dialColor: product.dialColor,
      },
      {
        caseMaterial: product.caseMaterial,
      },
      {
        type: product.type,
      },],
      
    })
    
  }


  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find({
      where: { status: ProductStatus.AVAILABLE },
      relations: ['owner'], // Lấy thông tin chủ sở hữu
    });
  }

  async findOne(id: string): Promise<any | null> {
    return this.productRepository.findOne({
      where: { id, status: ProductStatus.AVAILABLE },
      relations: ['owner'],
    });
  }

  async findOneWithRelated(id: string): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { id, status: ProductStatus.AVAILABLE },
      relations: ['owner'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const relatedProducts = await this.findRelatedProducts(id);

    return { product, relatedProducts };

  }


  async createProduct(product: any): Promise<any> {
    return this.productRepository.save(product);
  }

  async updateProduct(update: any): Promise<any> {
    return null;
  }

  async findLatest(): Promise<any | null> {
    return this.productRepository.find({
      order:{
        createdAt:"DESC"
      },
      relations: ['owner'],
      take: 8
    })
  }
}