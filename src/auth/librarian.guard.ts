import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { AuthUser } from './current-user.decorator';

@Injectable()
export class LibrarianGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: AuthUser }>();
    const user = request.user;
    if (!user?.isLibrarian) {
      throw new ForbiddenException('Librarian role required');
    }
    return true;
  }
}
