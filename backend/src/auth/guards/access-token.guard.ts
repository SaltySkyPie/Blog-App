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

  async canActivate(context: ExecutionContext) {
    // Check if the route is marked as public using the IS_PUBLIC_KEY metadata
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])

    try {
      // Call the superclass canActivate method
      await super.canActivate(context)
    } catch (e) {
      // If an exception is caught and the route is public, allow access
      if (isPublic) {
        return true
      }

      // If the route is not public, rethrow the exception
      throw e
    }

    // If no exception is thrown, allow access
    return true
  }
}
