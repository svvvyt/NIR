import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './posts.schema';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async getAll() {
    return this.postModel.find().populate('user').exec();
  }

  async getOne(postId: string) {
    const post = await this.postModel
      .findByIdAndUpdate(postId, { $inc: { viewsCount: 1 } }, { new: true })
      .populate('user');
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async create(createPostDto: CreatePostDto) {
    const post = new this.postModel(createPostDto);
    return post.save();
  }

  async remove(postId: string) {
    const deletedPost = await this.postModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      throw new NotFoundException('Post not found');
    }
    return { success: true };
  }

  async update(postId: string, updatePostDto: UpdatePostDto) {
    const updatedPost = await this.postModel.findByIdAndUpdate(
      postId,
      updatePostDto,
      { new: true },
    );
    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }
    return { success: true, updatedPost };
  }
}
