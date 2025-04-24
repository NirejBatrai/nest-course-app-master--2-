import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthUser } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser)
    private readonly authUserModel: typeof AuthUser,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const authuser = await this.authUserModel.findOne({
      where: { email: registerDto.email },
    });
    if (authuser) {
      throw new BadRequestException(
        'This email is already exsits. Please try again',
      );
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(registerDto.password, salt);

    const newUser = await this.authUserModel.create({
      username: registerDto.username,
      email: registerDto.email,
      password: hashPassword,
      role: 'USER',
    });
    return newUser;
  }

  async login(loginDto: LoginDto) {
    const authuser = await this.authUserModel.findOne({
      where: { email: loginDto.email },
    });
    if (!authuser) {
      throw new UnauthorizedException(
        'this email does not exit. Please try again.',
      );
    }

    const isValid = await compare(loginDto.password, authuser.password);
    if (!isValid) {
      throw new UnauthorizedException('error password!!!');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = {
      user_id: authuser.id,
      username: authuser.username,
      email: authuser.email,
      role: authuser.role,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
    return { access_token: token };
  }
  async getUserProfile(id: number) {
    return await this.authUserModel.findByPk(id, {
      attributes: ['id', 'username', 'email'],
    });
  }
}

// export type UserPayload = {
//   user_id: number;
//   username: string;
//   email: string;
//   role: "USER" | "ADMIN"; // Assuming role can be either USER or ADMIN
//   iat: number; // Issued at (usually a Unix timestamp)
//   exp: number; // Expiry (usually a Unix timestamp)
// };
