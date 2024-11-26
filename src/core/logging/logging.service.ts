import { LoggerService, Injectable } from '@nestjs/common';
import { COLORS, printText } from '../utils/printText';
import { mkdir, appendFile, stat, rename } from 'node:fs/promises';
import * as path from 'node:path';
import 'dotenv/config';

@Injectable()
export class LoggingService implements LoggerService {
  private levels = [
    'ALL',
    'DEBUG',
    'VERBOSE',
    'INFO',
    'WARN',
    'ERROR',
    'FATAL',
  ];
  private logLevel: string = process.env.LOG_LEVEL || 'ALL';
  private maxLogSize: number = parseInt(
    process.env.LOG_FILE_MAX_SIZE || '1024',
  );
  private logDir = path.join(process.cwd(), 'logs');
  private logFile = path.join(this.logDir, 'application.log');

  private async rotateLogFile(): Promise<void> {
    try {
      const stats = await stat(this.logFile);
      const fileSizeInKB = stats.size / 1024;

      if (fileSizeInKB >= this.maxLogSize) {
        const rotatedFile = path.join(
          this.logDir,
          `application-${this.getTimestamp().replace(/:/g, '-')}.log`,
        );
        await rename(this.logFile, rotatedFile);
        console.log(`[LOG ROTATION] Log file rotated: ${rotatedFile}`);
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error('[LOG ROTATION ERROR]', err);
      }
    }
  }

  private shouldLog(level: string): boolean {
    return (
      this.levels.indexOf(this.logLevel.toUpperCase()) <=
      this.levels.indexOf(level)
    );
  }

  private getTimestamp(): string {
    const now = new Date();
    return `${now.toISOString()}`;
  }

  private async logToFile(level: string, message: string): Promise<void> {
    if (!this.shouldLog(level)) return;

    const logMessage = `${this.getTimestamp()} [${level}] ${message}\n`;

    try {
      await mkdir(this.logDir, { recursive: true });
      await this.rotateLogFile();
      await appendFile(this.logFile, logMessage, 'utf8');
    } catch (err) {
      console.error(
        '[CUSTOM FATAL]',
        `${this.getTimestamp()} Failed to log to file:`,
        err,
      );
    }
  }

  private logToConsole(
    level: string,
    color: string,
    message: string,
    context: string,
    optionalParams: unknown[],
  ): void {
    if (!this.shouldLog(level)) return;

    const levelTag = `[CUSTOM ${level}]`;
    const timestamp = this.getTimestamp();
    const coloredLevel = printText(levelTag, color);
    const coloredContext = `${COLORS.cyan}[${context}]${COLORS.reset}`;
    console.log(
      `${coloredLevel} ${COLORS[color]}${timestamp} ${message}${COLORS.reset} ${coloredContext}`,
      ...optionalParams,
    );
  }

  log(
    message: string,
    context = 'Application',
    ...optionalParams: unknown[]
  ): void {
    this.logToConsole('INFO', 'green', message, context, optionalParams);
    this.logToFile('INFO', message);
  }

  fatal(
    message: string,
    context = 'Application',
    ...optionalParams: unknown[]
  ): void {
    this.logToConsole('FATAL', 'magenta', message, context, optionalParams);
    this.logToFile('FATAL', message);
  }

  error(
    message: string,
    context = 'Application',
    ...optionalParams: unknown[]
  ): void {
    this.logToConsole('ERROR', 'red', message, context, optionalParams);
    this.logToFile('ERROR', message);
  }

  warn(
    message: string,
    context = 'Application',
    ...optionalParams: unknown[]
  ): void {
    this.logToConsole('WARN', 'yellow', message, context, optionalParams);
    this.logToFile('WARN', message);
  }

  debug?(
    message: string,
    context = 'Application',
    ...optionalParams: unknown[]
  ): void {
    this.logToConsole('DEBUG', 'cyan', message, context, optionalParams);
    this.logToFile('DEBUG', message);
  }

  verbose?(
    message: string,
    context = 'Application',
    ...optionalParams: unknown[]
  ): void {
    this.logToConsole('VERBOSE', 'blue', message, context, optionalParams);
    this.logToFile('VERBOSE', message);
  }
}
