import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoomEntity } from 'src/entities/chatRoom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoomEntity)
    private chatRoomRepository: Repository<ChatRoomEntity>,
  ) {}
  async findAll(): Promise<ChatRoomEntity[]> {
    return this.chatRoomRepository.find();
  }

  async findOne(id: string): Promise<any | null> {
    return await this.chatRoomRepository.findOne({
      where: { id },
      relations: ['participant'],
    });
  }

  async getChatRoomByRoom(code: string): Promise<any | null> {
    return await this.chatRoomRepository.find({
      relations: ['participant'],
      where: {
        code: code,
      },
      order: {
        createdAt: -1,
      },
    });
  }

  async getChatRoomByParticipant(userId: string): Promise<any | null> {
    return await this.chatRoomRepository.find({
      relations: ['participant'],
      where: {
        participant: {
          id: userId,
        },
      },
      order: {
        createdAt: -1,
      },
    });
  }

  async createChatRoom(chatRoom: any): Promise<any> {
    console.log('Chat room data: ', chatRoom);
    return this.chatRoomRepository.save(chatRoom);
  }

  async updateChatRoom(id: string, update: any): Promise<any> {
    return this.chatRoomRepository.update(id, update);
  }
}
