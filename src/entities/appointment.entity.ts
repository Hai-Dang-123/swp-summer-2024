import { Entity,Column, ManyToOne } from "typeorm";
import { SellerRequestEntity } from "./sellerRequest.entity";
import { ProductEntity } from "./product.entity";
import { BaseEntity } from "src/common/base/entity.base";
import { AccountEntity } from "./account.entity";

@Entity()
export class AppointmentEntity extends BaseEntity  {
 
  @ManyToOne(() => AccountEntity)
  account: AccountEntity;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @Column({ type: 'timestamp' })
  scheduleDate: Date;

  @Column({ 
    type: 'enum', 
    enum: ['scheduled', 'completed', 'cancelled'], 
    default: 'scheduled' 
  })
  status: string;
}