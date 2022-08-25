import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('ACC_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    return { sub: payload.sub, username: payload.username };
    //const token = new AuthTokenDto(bearer[1]);
    //return this.authService.validate(new AuthTokenDto(token));
    //{ sub:userId, name:username };;
  }
}
