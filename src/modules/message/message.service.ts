import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}
  async findAll(): Promise<MessageEntity[]> {
    return this.messageRepository.find();
  }

  async findOne(id: string): Promise<any | null> {
    return this.messageRepository.findOne({
      where: { id },
    });
  }

  async getMessagesByUser(userId: string): Promise<any | null> {
    return this.messageRepository.find({
      relations: ['recipient', 'sender'],
      where: [
        {
          recipient: {
            id: userId,
          },
        },
        {
          sender: {
            id: userId,
          },
        },
      ],
      order: {
        createdAt: -1,
      },
    });
  }

  async createMessage(message: any): Promise<any> {
    return this.messageRepository.save(message);
  }

  async updateMessage(id: string, update: any): Promise<any> {
    return this.messageRepository.update(id, update);
  }
}
