import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Post()
  createMessage(
    @Body()
    message: {
      sender: UUID;
      recipient: string;
      content: string;
    },
  ) {
    const result = this.messageService.createMessage(message);
    return result
      ? result
      : {
          message: 'Failed to create new message',
        };
  }

  @Get('/user/:id')
  getMessagesByUser(@Param('id') userId: string) {
    return this.messageService.getMessagesByUser(userId);
  }

  @Patch(':id')
  updateMessage(
    @Param('id') id: string,
    @Body()
    update: {
      sender: UUID;
      recipient: string;
      content: string;
    },
  ) {
    return this.messageService.updateMessage(id, update);
  }
}
