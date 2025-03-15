import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from 'src/auth/entities/auth.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(AuthUser)
    private readonly authUserModel: typeof AuthUser,
  ) {}

  async findAll(): Promise<AuthUser[]> {
    return await this.authUserModel.findAll();
  }

  async findOne(id: number) {
    const user = await this.authUserModel.findOne({ where: { id } });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<AuthUser> {
    const user = await this.authUserModel.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await user.update(updateUserDto); // Update the user with new data
    return user;
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.authUserModel.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await user.destroy(); // Delete the user from the database

    return { message: `User with ID ${id} has been removed` };
  }
}
