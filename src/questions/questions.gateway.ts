import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { QuestionsService } from './questions.service';

@WebSocketGateway()
export class QuestionsGateway {
  constructor(private readonly questionService: QuestionsService) {}

  @SubscribeMessage('send-question')
  async handleSendQuestion(
    @MessageBody('name') displayName: string,
    @MessageBody('sessionId') sessionId: string,
    @MessageBody('question') questionText: string,
    @ConnectedSocket() client: Socket,
  ) {
    const newQuestion = await this.questionService.create(sessionId, {
      displayName,
      questionText,
    });
    return client.emit('send-question', newQuestion);
  }
}
