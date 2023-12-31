import { CreateUserInput } from '@app/user/dto/create-user.input'
import { User } from '@app/user/entities/user.entity'
import { Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from './decorators/public.decorator'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { RefreshTokenAuthGuard } from './guards/refresh-token.guard'
import { AccessTokenAuthGuard } from './guards/access-token.guard'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Request() req: Request & { user: User }) {
    return this.authService.login(req.user)
  }

  @UseGuards(AccessTokenAuthGuard)
  @Get('profile')
  getProfile(@Request() req: Request & { user: User }) {
    return req.user
  }

  @UsePipes(new ValidationPipe())
  @Public()
  @Post('register')
  async register(@Body() userData: CreateUserInput) {
    return this.authService.register(userData)
  }

  @Get('refresh')
  @Public()
  @UseGuards(RefreshTokenAuthGuard)
  async refresh(@Request() req: Request & { user: User }) {
    return this.authService.getTokens(req.user)
  }
}
