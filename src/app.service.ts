import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'HR Backoffice API - Welcome!';
  }

  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'hr-backoffice-api',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
