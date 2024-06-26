import { BaseEntity } from 'src/common/base/entity.base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { MessageEntity } from './message.entity';
import { ProductEntity } from './product.entity';

@Entity({
  name: 'CHAT_ROOM',
})
export class ChatRoomEntity extends BaseEntity {
  @Column({
    name: 'code',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  code: string;

  @ManyToOne(() => AccountEntity, (account) => account.chatRooms)
  participant: AccountEntity;

  @OneToMany(() => MessageEntity, (message) => message.chatRoom)
  messages: MessageEntity[];

  @Column({
    name: 'productId',
    type: 'varchar',
    nullable: false,
  })
  productId: string;
}
