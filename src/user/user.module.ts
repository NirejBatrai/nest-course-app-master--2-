import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GlobalHelperModule } from 'src/shared/global-helper/global-helper.module';

@Module({
  controllers: [UserController],
  imports: [GlobalHelperModule],
})
export class UserModule {}
