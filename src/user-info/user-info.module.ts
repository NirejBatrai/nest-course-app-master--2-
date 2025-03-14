import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserInfo } from './entities/user-info.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserInfo])],
  controllers: [UserInfoController],
  providers: [UserInfoService],
})
export class UserInfoModule {}
