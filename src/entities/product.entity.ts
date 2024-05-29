import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { AccountEntity } from './account.entity';

export enum ProductStatus {
  IN_APPRAISAL = 'IN APPRAISAL',
  AVAILABLE = 'AVAILABLE',
  ORDERED = 'ORDERED',
  SOLD = 'SOLD',
}
<<<<<<< HEAD

=======
>>>>>>> 0df0897b533820ab0f0db94a2ac26f13a125f70d
@Unique(['name'])
@Entity({
  name: 'PRODUCT',
})
export class ProductEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, (account) => account.id)
<<<<<<< HEAD
  owner: string;
=======
  owner: AccountEntity;
>>>>>>> 0df0897b533820ab0f0db94a2ac26f13a125f70d

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
<<<<<<< HEAD
    name: 'description',
    type: 'text',
    nullable: false,
  })
  description: string;
=======
    name: 'brand',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  brand: string;
>>>>>>> 0df0897b533820ab0f0db94a2ac26f13a125f70d

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'image',
  })
  image: string;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
<<<<<<< HEAD
    name: 'type',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  type: string;

  @Column({
    name: 'dialColor',
=======
    name: 'description',
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    name: 'type',
>>>>>>> 0df0897b533820ab0f0db94a2ac26f13a125f70d
    type: 'varchar',
    length: 20,
    nullable: false,
  })
<<<<<<< HEAD
  dialColor: string;

  @Column({
    name: 'box',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  box: boolean;

  @Column({
=======
  type: string;

  @Column({
    name: 'dialColor',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  dialColor: string;

  @Column({
    name: 'box',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  box: boolean;

  @Column({
>>>>>>> 0df0897b533820ab0f0db94a2ac26f13a125f70d
    name: 'papers',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  papers: boolean;

  @Column({
    name: 'waterResistance',
    type: 'decimal',
    precision: 10,
    nullable: true,
    default: 0,
  })
  waterResistance: number;

  @Column({
    name: 'caseMaterial',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  caseMaterial: string;

  @Column({
    name: 'caseSize',
<<<<<<< HEAD
    type: 'decimal',
    precision: 10,
    nullable: false,
    default: 0,
  })
  caseSize: number;
=======
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  caseSize: string;
>>>>>>> 0df0897b533820ab0f0db94a2ac26f13a125f70d

  @Column({
    name: 'pastUsageTime',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  pastUsageTime: string;

  @Column({
    name: 'yearOfProduction',
    type: 'varchar',
    length: 4,
    nullable: true,
  })
  yearOfProduction: string;

  @Column({
    name: 'remainingInsurance',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  remainingInsurance: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.IN_APPRAISAL,
  })
  status: ProductStatus;
}
