import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, ManyToMany, OneToMany, Unique } from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';
import { MessageEntity } from './message.entity';
import { ChatRoomEntity } from './chatRoom.entity';

export enum Role {
  admin = 'admin',
  staff = 'staff',
  user = 'user',
}

@Unique(['email'])
@Entity({
  name: 'ACCOUNT',
})
export class AccountEntity extends BaseEntity {
  @Column({
    name: 'Username',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  username: string;

  @Column({
    name: 'Email',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'Phone',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column({
    name: 'Password',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'Role',
    type: 'enum',
    enum: Role,
    default: Role.user,
    nullable: false,
  })
  role: Role;

  @Column({
    name: 'Avatar',
    type: 'text',
    nullable: false,
    default:
      'https://i.pinimg.com/736x/7e/a4/af/7ea4af7d8401d2b43ee841bfa2abe89d.jpg',
  })
  avatar: string;

  @OneToMany(() => ProductEntity, (product) => product.owner)
  products: ProductEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany(() => MessageEntity, (message) => message.sender)
  sentMessages: MessageEntity[];

  @OneToMany(() => MessageEntity, (message) => message.recipient)
  receivedMessages: MessageEntity[];

  @OneToMany(() => ChatRoomEntity, (chatRoom) => chatRoom.participant)
  chatRooms: ChatRoomEntity[];
}
