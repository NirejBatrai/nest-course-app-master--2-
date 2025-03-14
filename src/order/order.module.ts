import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { UtilityModule } from 'src/shared/utility/utility.module';

@Module({
  controllers: [OrderController],
  imports: [UtilityModule],
})
export class OrderModule {}
