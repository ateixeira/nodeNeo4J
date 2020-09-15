import Pino from 'pino';
import { LogLevel } from './log-level.type';
import { LogObj } from './log-obj.type';

export class PinoLoggerService {
  private logger: Pino.Logger;

  constructor(level: LogLevel) {
    this.logger = Pino({ level });
  }

  // Log level: 30
  info(obj: LogObj): void {
    this.logger.info(obj);
  }

  // Log level: 50
  error(obj: LogObj): void {
    this.logger.error(obj);
  }
}
