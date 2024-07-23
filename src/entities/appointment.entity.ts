import { Entity, Column, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { BaseEntity } from 'src/common/base/entity.base';
import { AccountEntity } from './account.entity';

@Entity({
  name: 'APPOINTMENT',
})
export class AppointmentEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, (account) => account.appointments, {
    eager: true,
  })
  account: AccountEntity;

  @ManyToOne(() => ProductEntity, (product) => product.appointments, {
    eager: true,
  })
  product: ProductEntity;

  @Column({
    name: 'date',
    type: 'varchar',
    nullable: false,
  })
  date: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  })
  status: string;
}
