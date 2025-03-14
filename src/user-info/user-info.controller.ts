import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(jwtAuthGuard)
@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post('/create')
  async create(@Body() createUserInfoDto: CreateUserInfoDto) {
    const createUser = await this.userInfoService.create(createUserInfoDto);
    if (createUser == null) {
      throw new Error('Can not create user Data!!');
    }
    return {
      message: 'Create user data complete',
      data: createUser,
    };
  }

  @Get('/findlastname/:lastname')
  async findFirstname(@Param('lastname') lastname: string) {
    const findlastname = await this.userInfoService.findLastname(lastname);
    if (findlastname == null) {
      throw new NotFoundException('Not found Data');
    }
    return findlastname;
  }

  @Get()
  findAll() {
    return this.userInfoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const finduser = await this.userInfoService.findOne(+id);
    if (finduser == null) {
      throw new NotFoundException('Not found USer Data');
    }
    return finduser;
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserInfoDto: UpdateUserInfoDto,
  ) {
    const [updateUser] = await this.userInfoService.update(
      +id,
      updateUserInfoDto,
    );
    console.log(updateUser);
    if (updateUser == 0) {
      throw new NotFoundException('Not found Data to Update USer!!');
    }
    return { message: 'Update Data Complete' };
  }
  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    const destroyUser = await this.userInfoService.remove(+id);
    console.log(destroyUser);
    if (destroyUser == 0) {
      throw new NotFoundException('Not found USer Data to remove!!!');
    }
    return { message: 'Remove USer Data Complete' };
  }
}
