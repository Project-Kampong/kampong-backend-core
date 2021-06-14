import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  _id: string;
  @Prop()
  username: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  role: string;
  @Prop()
  is_activated: boolean;
  @Prop()
  first_name: string;
  @Prop()
  last_name: string;
  @Prop()
  nickname: string;
  @Prop()
  profilePicture: string;
  @Prop()
  about: string;
  @Prop()
  gender: string;
  @Prop()
  dob: Date;
  @Prop()
  occupation: string;
  @Prop()
  phone: string;
  @Prop()
  facebook_link: string;
  @Prop()
  twitter_link: string;
  @Prop()
  instagram_link: string;
  @Prop()
  linkedin_link: string;
  @Prop()
  is_verified: boolean;
  @Prop()
  created_on: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
