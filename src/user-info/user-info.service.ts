import { Injectable } from '@nestjs/common';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserInfo } from './entities/user-info.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectModel(UserInfo)
    private userInfoModel: typeof UserInfo,
  ) {}
  async create(createUserInfoDto: CreateUserInfoDto) {
    return await this.userInfoModel.create(
      createUserInfoDto as Partial<UserInfo>,
    );
  }

  async findLastname(lastname: string) {
    return await this.userInfoModel.findOne({
      where: {
        lastname: lastname,
      },
    });
  }

  async findAll() {
    return await this.userInfoModel.findAll({
      order: [['id', 'desc']],
    });
  }

  async findOne(id: number) {
    return await this.userInfoModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserInfoDto) {
    return await this.userInfoModel.update(updateUserDto, {
      where: { id: id },
    });
  }

  async remove(id: number) {
    return await this.userInfoModel.destroy({
      where: { id: id },
    });
  }
}
