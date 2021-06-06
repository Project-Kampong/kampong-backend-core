import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  handleConnection(): void {
    console.log('User connected to chat gateway');
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() msg: string): void {
    this.server.emit('message', msg);
  }
}
