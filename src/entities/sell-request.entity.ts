// sell-request.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SellRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column('json', { nullable: true }) // Sử dụng kiểu dữ liệu 'json' cho cột watchForm
  watchForm: any;

  @Column('json', { nullable: true }) // Sử dụng kiểu dữ liệu 'json' cho cột sellForm
  sellForm: any;

  @Column()
  address: string;

  @Column()
  role: string;

  // Các trường dữ liệu khác của SellRequest
}
