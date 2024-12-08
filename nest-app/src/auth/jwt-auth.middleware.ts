import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    try {
      const decoded = jwt.verify(token, 'secret123'); // TODO: Move secret to environment variable
      req.userId = decoded._id;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
