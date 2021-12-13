import {
  NestMiddleware,
  Injectable,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';


@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  use(req: Request, res: Response, next: NextFunction){ }

  
}
