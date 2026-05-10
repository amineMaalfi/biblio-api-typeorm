import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type AuthUser = {
  id: number;
  email: string;
  isLibrarian: boolean;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthUser }>();
    return request.user;
  },
);
