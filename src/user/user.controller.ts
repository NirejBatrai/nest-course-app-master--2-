import { Controller, Get, UseGuards } from '@nestjs/common';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GlobalHelperService } from 'src/shared/global-helper/global-helper.service';

@UseGuards(jwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly globalHelperService: GlobalHelperService) {}

  @Get('/global') //localhost:3000/product/shared
  globalFunc(): string {
    return this.globalHelperService.globalFunc();
  }
}
