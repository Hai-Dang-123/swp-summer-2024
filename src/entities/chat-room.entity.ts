import { BaseEntity } from 'src/common/base/entity.base';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { ChatRoomToUserEntity } from './chat-room-to-user.entity';

@Entity({
  name: 'CHAT_ROOM',
})
export class ChatRoomEntity extends BaseEntity {
  @OneToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;

  @OneToMany(
    () => ChatRoomToUserEntity,
    (chatRoomToUser) => chatRoomToUser.chatRoom,
  )
  chatRoomToUser: ChatRoomToUserEntity[];

  @Column({
    name: 'code',
    type: 'varchar',
    nullable: false,
  })
  code: string;
}
