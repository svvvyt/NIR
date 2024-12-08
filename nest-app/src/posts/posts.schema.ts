import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../users/users.schema';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  text: string;

  @Prop({ type: String })
  imageUrl: string;

  @Prop({ type: String, required: true, ref: 'User' })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
