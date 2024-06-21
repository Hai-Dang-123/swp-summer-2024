import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, Unique } from 'typeorm';

export enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    EXPIRED = 'EXPIRED',
    REFUNDED = 'REFUNDED',
}

@Entity({
    name: 'ZALOPAY',
})
export class ZaloPayEntity extends BaseEntity {
    @Column({
        name: 'order_id',
        type: 'varchar',
        nullable: false,
    })
    orderId: string;

    @Column({
        name: 'total',
        type: 'float',
        nullable: false,
    })
    total: number;
    
}
