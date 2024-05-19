import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { OrderItemEntity } from "./order-item.entity";
import { VoucherEntity } from "./voucher.entity";

export enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    CANCELED = 'CANCELED',
    EXPIRED = 'EXPIRED',
    SHIPPING = 'SHIPPING',
    COMPLETED = 'COMPLETED',
    REFUND = 'REFUND',
}   
@Entity({
    name: "ORDER",
})
export class OrderEntity extends BaseEntity {

    @Column({
        name: "email",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    email: string;

    @Column({
        name: "phone",
        type: "varchar",
        length: 15,
        nullable: false,
    })
    phone: string;

    @Column({
        name: "username",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    username: string;

    @Column({
        name: "address",
        type: "text",
        nullable: false,
    })
    address: string;

    @Column({
        name: "total",
        type: "float",
        nullable: false,
    })
    total: number;

    @ManyToOne(() => VoucherEntity, voucher => voucher.id)
    voucher: string;

    @Column({
        name: "status",
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @Column({
        name: "app_trans_id",
        type: 'varchar',
    })
    app_trans_id: string;

    @Column({
        name: "zp_trans_id",
        type: 'varchar',
        nullable: true,
    })
    zp_trans_id: string;

    @Column({
        name: "payment",
        type: 'jsonb',
        nullable: true,
    })
    payment: any;

    @OneToMany(() => OrderItemEntity, orderItem => orderItem.order)
    items: OrderItemEntity[];

    @Column({
        name: "note",
        type: "text",
        nullable: true,
    })
    note: string;

}