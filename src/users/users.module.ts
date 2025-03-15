import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthUser } from 'src/auth/entities/auth.entity';

@Module({
  imports: [SequelizeModule.forFeature([AuthUser])], // Use SequelizeModule instead of TypeOrmModule
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
