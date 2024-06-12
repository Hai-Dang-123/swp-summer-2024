import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { FindManyOptions, Not, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) { }


  //sản phẩm liên quan trung thêm nè
  async findRelatedProducts(productId) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId
      }
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
      }],
      take: 8, // Giới hạn số lượng sản phẩm liên quan trả về
    })
  }


  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }
  //gốc
  async findOne(id: string): Promise<any | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
  }

  //phần trung sửa 
  // async findOne(id: string): Promise<any> {
  //   const product = await this.productRepository.findOne({
  //     where: { id },
  //     relations: ['owner'],
  //   });

  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   const relatedProducts = await this.findRelatedProducts(id);

  //   return { product, relatedProducts };

  // }


  async createProduct(product: any): Promise<any> {
    return this.productRepository.save(product);
  }

  async updateProduct(update: any): Promise<any> {
    return null;
  }
}
