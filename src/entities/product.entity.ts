import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import { CategoryEntity } from "./category.entity";

export enum ProductStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

@Unique(["name"])
@Entity({
    name: "PRODUCT",
})
export class ProductEntity extends BaseEntity {

    @Column({
        name: "name",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    name: string;

    @Column({
        name: "description",
        type: "text",
        nullable: false,
    })
    description: string;

    @Column({
        type: 'varchar',
        nullable: false,
        name: 'image'
    })
    image: string;

    @Column({
        name: "status",
        type: "enum",
        enum: ProductStatus,
        default: ProductStatus.ACTIVE,
    })
    status: ProductStatus;

    @ManyToOne(() => CategoryEntity, category => category.id)
    category: CategoryEntity;

}