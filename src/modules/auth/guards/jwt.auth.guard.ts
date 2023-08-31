import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '@/common/decorators';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/modules/auth/auth.service';
import { ApiResponseCodeEnum, PassPortStrategyEnum } from '@/helper/enums';

/**
 * 用于扩展 Passport JWT策略 会在 JwtStrategy 之前执行 canActivate 函数如果返回 false 或者抛出错误 则不会执行 JwtStrategy 策略 可以
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(PassPortStrategyEnum.JWT) {
  constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 跳过 自定义Public装饰器 修饰过的 请求
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(req);

    console.log('jwt auth守卫执行 ----->', token);
    if (!token)
      throw new UnauthorizedException({
        code: ApiResponseCodeEnum.UNAUTHORIZED,
        msg: 'Token cannot be empty',
      });

    const payload = await this.authService.verifyToken(token);
    console.log('payload ----->', payload);
    if (!payload) throw new UnauthorizedException('登录信息已过期，请重新登录！');

    // 挂在 user 对象
    // req['user'] = { ...payload, roles: ['admin'] };

    // super.canActivate(context);
    return this.activate(context);
  }

  // 提取tooken
  private extractToken(req: Request): string | undefined {
    return (
      req.headers['authorization'] ||
      req.headers['Authorization'] ||
      req.headers['token'] ||
      req.body['token'] ||
      req.query['token'] ||
      ''
    ).replaceAll('Bearer ', '');
  }

  async activate(ctx: ExecutionContext): Promise<boolean> {
    return super.canActivate(ctx) as Promise<boolean>;
  }
}
