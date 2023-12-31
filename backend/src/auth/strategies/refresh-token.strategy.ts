import { JwtUser } from '@app/user/user.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
    })
  }

  async validate(payload: any): Promise<JwtUser> {
    return {
      id: payload.id,
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName,
      middleName: payload.middleName,
    }
  }
}
