import { Controller, Get, Headers, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

export interface ReqHeaders{
  idtoken: string;
  username: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/profile')
  getProfile(@Headers() headers: ReqHeaders, @Res() response:Response): Response {
    const profile = this.appService.getProfile(headers);
    return response.json({message: profile});
  }
}
