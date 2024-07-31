import { Injectable } from '@nestjs/common';
import { ReqHeaders } from './app.controller';


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getProfile(headers: ReqHeaders): string {
    const decodedToken = this.decodeJwt(headers.idtoken);
    const validateToken = this.validateToken(decodedToken, headers.username);
    if(!validateToken){
      return "Oops! I don't know  your favourite sport?"
    }
    return 'Your favourite sport is '+ decodedToken['custom:fav_sports'];
  }

  validateToken(decodedToken, username:string): boolean {
    if(decodedToken?.email !== username) return false;
    else return true;
  }
  decodeJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('ascii');
    return JSON.parse(jsonPayload);
  }
}
