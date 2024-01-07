import { CreateUserInput } from '@app/user/dto/create-user.input'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { JwtUser, UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(username: string, pass: string): Promise<JwtUser | null> {
    const user = await this.usersService.findOneByUsername(username)
    if (user && (await this.compareHash(pass, user.password))) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login(user: JwtUser) {
    const tokens = await this.getTokens(user)
    return tokens
  }

  async register(userData: CreateUserInput) {
    try {
      const hashedPassword = await this.hashData(userData.password)
      const user = await this.usersService.create({
        ...userData,
        password: hashedPassword,
      })
      return this.login(user)
    } catch (e) {
      if (e.message.includes('Username is already taken')) {
        throw new HttpException(e.message, HttpStatus.CONFLICT)
      }
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getTokens(user: JwtUser) {
    const payload = {
      username: user.username,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
    }
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '15m',
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      }),
    }
  }

  private async hashData(data: string) {
    return bcrypt.hash(data, 10)
  }

  private async compareHash(data: string, hash: string) {
    return bcrypt.compare(data, hash)
  }
}
