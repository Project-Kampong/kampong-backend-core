import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { QuestionsService } from './questions.service';

@WebSocketGateway(null, {
  allowEIO3: true,
  cors: { origin: true, credentials: true },
})
export class QuestionsGateway implements OnGatewayConnection {
  constructor(private readonly questionService: QuestionsService) {}

  handleConnection(
    @ConnectedSocket() client: Socket,
    @MessageBody() userData: unknown,
  ): void {
    client.emit('connected');
    Logger.log(`User ${userData} connected to questions gateway`);
  }

  @SubscribeMessage('send-question')
  async handleSendQuestion(
    @MessageBody('name') displayName: string,
    @MessageBody('sessionId') sessionId: string,
    @MessageBody('question') questionText: string,
  ) {
    return this.questionService.create(sessionId, {
      displayName,
      questionText,
    });
  }
}
