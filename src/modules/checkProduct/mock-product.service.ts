import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProductStatus } from 'src/entities/product.entity';


@Injectable()
export class MockProductService {
  getMockProducts() {
    const category = new CategoryEntity();
    category.id = '1';
    category.name = 'Mock Category';

    return [
      {
        id: 1,
        name: 'Mock Product 1',
        description: 'Description for mock product 1',
        image: 'https://example.com/image1.jpg',
        price: 100.00,
        quantity: 10,
        status: ProductStatus.ACTIVE,
        category: category,
      },
      {
        id: 2,
        name: 'Mock Product 2',
        description: 'Description for mock product 2',
        image: 'https://example.com/image2.jpg',
        price: 200.00,
        quantity: 20,
        status: ProductStatus.INACTIVE,
        category: category,
      },
      
      {
        id: 3,
        name: 'Mock Product 3',
        description: 'Description for mock product 3',
        image: 'https://example.com/image3.jpg',
        price: 150.00,
        quantity: 15,
        status: ProductStatus.ACTIVE,
        category: category,
      },
      {
        id: 4,
        name: 'Mock Product 4',
        description: 'Description for mock product 4',
        image: 'https://example.com/image4.jpg',
        price: 250.00,
        quantity: 25,
        status: ProductStatus.INACTIVE,
        category: category,
      },
      {
        id: 5,
        name: 'Mock Product 5',
        description: 'Description for mock product 5',
        image: 'https://example.com/image5.jpg',
        price: 300.00,
        quantity: 30,
        status: ProductStatus.ACTIVE,
        category: category,
      }
      // Thêm sản phẩm mẫu khác ở đây nếu cần
    ];
    
  }
}
