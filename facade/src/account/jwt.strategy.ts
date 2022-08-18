import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthTokenDto } from './dto/account-dto';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('ACC_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    return { sub:payload.sub, username: payload.username };
    //const token = new AuthTokenDto(bearer[1]);
    //return this.authService.validate(new AuthTokenDto(token));
    //{ sub:userId, name:username };
  }
}