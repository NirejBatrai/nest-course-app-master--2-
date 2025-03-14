import { Injectable } from '@nestjs/common';
import { Response } from 'express'; // Import Response from express
import { join } from 'path'; // Import join from path
import { Res } from '@nestjs/common'; // Import Res decorator

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  ShowInfo(): string {
    return 'Hello!, I am Chuwawa, I am 8 years old';
  }
  PostMan(): string {
    return 'we use postman';
  }
  getJson() {
    return {
      name: 'nil',
      lastname: 'uzuma',
      age: 12,
      version: process.env.API_VERSION,
    };
  }

  ShowImage(@Res() res: Response): void {
    const imagePath = join(__dirname, '..', 'src', 'images', 'andrew.jpg'); // Construct the path to the image
    res.sendFile(imagePath); // Send the image as a response
  }

  ShowImageSmartGuy(@Res() res: Response): void {
    const imagePath = join(__dirname, '..', 'src', 'images', 'smart.jpeg');
    res.sendFile(imagePath);
  }
}
