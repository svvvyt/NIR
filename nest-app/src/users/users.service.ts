import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './users.schema';
import { RegisterDto, LoginDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, fullName, password, avatarUrl } = registerDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({
      email,
      fullName,
      passwordHash,
      avatarUrl,
    });

    const user = await newUser.save();

    const token = this.generateToken(user._id);
    const { passwordHash: _, ...userData } = user.toObject();

    return { ...userData, token };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user._id);
    const { passwordHash: _, ...userData } = user.toObject();

    return { ...userData, token };
  }

  async getMe(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { passwordHash: _, ...userData } = user.toObject();
    return userData;
  }

  private generateToken(userId: string): string {
    return jwt.sign({ _id: userId }, 'secret123', { expiresIn: '30d' }); // TODO: Move secret
  }
}
