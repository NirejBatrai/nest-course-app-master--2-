import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'; // Import Response from express

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/showInformation')
  getInfo(): string {
    return this.appService.ShowInfo();
  }
  @Get('/usepostman')
  PostMan(): string {
    return this.appService.PostMan();
  }

  @Get('/showJson')
  getJson() {
    return this.appService.getJson();
  }

  @Get('/showAndrew') // Route to serve the image
  ShowImage(@Res() res: Response): void {
    this.appService.ShowImage(res); // Pass the response object to the service method
  }

  @Get('/showSmartGuy')
  ShowImageSmartGuy(@Res() res: Response): void {
    this.appService.ShowImageSmartGuy(res);
  }
}
