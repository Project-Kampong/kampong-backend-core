import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  private server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() msg: string): void {
    this.server.emit('message', msg);
  }
}
