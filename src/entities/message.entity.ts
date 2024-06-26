import { BaseEntity } from 'src/common/base/entity.base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { ChatRoomEntity } from './chatRoom.entity';

@Entity({
  name: 'MESSAGE',
})
export class MessageEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, (account) => account.sentMessages)
  sender: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.receivedMessages)
  recipient: AccountEntity;

  @ManyToOne(() => ChatRoomEntity, (room) => room.code)
  chatRoom: string;

  @Column({
    name: 'content',
    type: 'text',
    nullable: false,
  })
  content: string;
}
