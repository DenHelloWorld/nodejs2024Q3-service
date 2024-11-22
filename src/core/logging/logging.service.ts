import { LoggerService, Injectable } from '@nestjs/common';
import { COLORS, printText } from '../printText';

@Injectable()
export class LoggingService implements LoggerService {
  private getTimestamp(): string {
    const now = new Date();
    return `${now.toISOString()}`;
  }

  log(
    message: string,
    context = 'Application',
    ...optionalParams: unknown[]
  ): void {
    console.log(
      printText('[LOG]', 'green'),
      `${COLORS.green}${this.getTimestamp()} ${message}${COLORS.reset}`,
      `${COLORS.cyan}[${context}]${COLORS.reset}`,
      ...optionalParams,
    );
  }

  fatal(
    message: string,
    context = 'Application',
    ...optionalParams: unknown[]
  ): void {
    console.error(
      printText('[FATAL]', 'magenta'),
      `${COLORS.magenta}${this.getTimestamp()} ${message}${COLORS.reset}`,
      `${COLORS.cyan}[${context}]${COLORS.reset}`,
      ...optionalParams,
    );
  }

  error(
    message: string,
    context = 'Application',
    ...optionalParams: unknown[]
  ): void {
    console.error(
      printText('[ERROR]', 'red'),
      `${COLORS.red}${this.getTimestamp()} ${message}${COLORS.reset}`,
      `${COLORS.cyan}[${context}]${COLORS.reset}`,
      ...optionalParams,
    );
  }

  warn(
    message: string,
    context = 'Application',
    ...optionalParams: unknown[]
  ): void {
    console.warn(
      printText('[WARN]', 'yellow'),
      `${COLORS.yellow}${this.getTimestamp()} ${message}${COLORS.reset}`,
      `${COLORS.cyan}[${context}]${COLORS.reset}`,
      ...optionalParams,
    );
  }

  debug?(
    message: string,
    context = 'Application',
    ...optionalParams: unknown[]
  ): void {
    console.debug(
      printText('[DEBUG]', 'cyan'),
      `${COLORS.cyan}${this.getTimestamp()} ${message}${COLORS.reset}`,
      `${COLORS.cyan}[${context}]${COLORS.reset}`,
      ...optionalParams,
    );
  }

  verbose?(
    message: string,
    context = 'Application',
    ...optionalParams: unknown[]
  ): void {
    console.info(
      printText('[VERBOSE]', 'blue'),
      `${COLORS.blue}${this.getTimestamp()} ${message}${COLORS.reset}`,
      `${COLORS.cyan}[${context}]${COLORS.reset}`,
      ...optionalParams,
    );
  }
}
