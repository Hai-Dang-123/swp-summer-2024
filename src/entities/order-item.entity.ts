import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, ManyToOne } from "typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "./product.entity";
 
@Entity({
    name: "ORDER_ITEM",
})
export class OrderItemEntity extends BaseEntity {

    @ManyToOne(() => OrderEntity, order => order.id)
    order: string;

    @ManyToOne(() => ProductEntity, product => product.id)
    product: string;

    @Column({
        name: "name",
        type: "varchar",
        nullable: false,
    })
    name: string;

    @Column({
        name: "quantity",
        type: "int",
        nullable: false,
    })
    quantity: number;

    @Column({
        name: "price",
        type: "float",
        nullable: false,
    })
    price: number;

}