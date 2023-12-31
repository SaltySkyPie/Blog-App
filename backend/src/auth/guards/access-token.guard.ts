import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class AccessTokenAuthGuard extends AuthGuard('jwt') {
  constructor(protected reflector: Reflector) {
    super()
  }

  getRequest(context: ExecutionContext) {
    if (context.getType() == 'http') {
      const request = context.switchToHttp().getRequest()
      return request
    } else {
      const ctx = GqlExecutionContext.create(context)
      return ctx.getContext().req
    }
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
}
