import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({
    name: "SELL_REQUEST",
})
export class SellRequest {
  @PrimaryGeneratedColumn()
  id: number;


  @Column('json', { nullable: true })
  watchForm: any;

  @Column('json', { nullable: true })
  sellForm: any;

  @Column({ type: 'varchar', length: 255, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  role: string;

  // Các trường dữ liệu khác của SellRequest (nếu có)
}
