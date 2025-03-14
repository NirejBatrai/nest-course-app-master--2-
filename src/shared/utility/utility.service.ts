import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  chatFunc(): string {
    return 'use chat module';
  }
  userFunc(): string {
    return 'use user module';
  }
  orderFunc(): string {
    return 'use order module';
  }
  shareFunc(): string {
    return 'use shared module  ';
  }
}
