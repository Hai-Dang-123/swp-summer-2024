import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum SellRequestStatus {
  WITH_REPORT = 'WITH_REPORT',
  WITHOUT_REPORT = 'WITHOUT_REPORT',
}


@Entity({
  name: "SELL_REQUEST",
})
export class SellRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  watchBrand: string;

  @Column()
  watchName: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  image: string;

  @Column()
  priceWantToSell: number;

  

  @Column({ nullable: true })
  documents?: string;


  @Column({
    type: 'enum',
    enum: SellRequestStatus,
    
  })
  status: SellRequestStatus;
}
