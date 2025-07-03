import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next(); // não faz nada, apenas passa adiante para o próximo middleware ou controller
  }
}
