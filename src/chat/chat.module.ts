import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { UtilityModule } from 'src/shared/utility/utility.module';

@Module({
  controllers: [ChatController],
  imports: [UtilityModule],
})
export class ChatModule {}
