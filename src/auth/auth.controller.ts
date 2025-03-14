import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import { jwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/regist')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return {
      message: 'Register complete',
    };
  }

  @Post('/login') //localhost:3000/auth/login
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  @UseGuards(jwtAuthGuard)
  @Get('/profile')
  async getUserProfile(@Request() req: any) {
    return await this.authService.getUserProfile(Number(req.user.user_id));
  }
}
