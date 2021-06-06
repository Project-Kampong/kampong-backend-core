import {
  ConnectedSocket,
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

  // TODO: verify if this takes over the place of the 'setup' event mentioned in Kampong socket.io docs
  handleConnection(@MessageBody() userData): void {
    this.server.emit('connected');
    console.log(`User ${userData} connected to chat gateway`);
  }

  @SubscribeMessage('join chat')
  userJoinChat(@MessageBody() roomId: string, @ConnectedSocket() client): void {
    client.join(roomId);
  }

  @SubscribeMessage('new message')
  handleMessage(
    @MessageBody()
    msg: {
      chat: { userIds: string[] };
      sender: { _id: string };
      text: string;
    },
    @ConnectedSocket() client,
  ): void {
    const {
      chat: { userIds },
      sender: { _id: senderUserId },
    } = msg;
    userIds.forEach((userId) => {
      if (userId === senderUserId) return;
      // TODO: insert db persistence logic handler here
      client.to(userId).emit('message received', msg);
    });
  }
}
