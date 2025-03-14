import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secretkey = process.env.JWT_SECRET_KEY;
    if (!secretkey) {
      throw new Error('Secret is not found');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretkey,
    });
  }

  async validate(payload: any) {
    return { user_id: payload.user_id };
  }
}
