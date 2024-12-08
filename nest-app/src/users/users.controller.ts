import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto, LoginDto } from './dto/user.dto';
import { ValidationPipe } from '../common/validation/validation.pipe';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDto: RegisterDto) {
    return await this.userService.register(registerDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }
}
