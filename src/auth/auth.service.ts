import { Injectable } from '@nestjs/common';
import { SigninResponse, SignupResponse } from './auth.controller';
import { SigninDto } from '../dto/SigninDto';
import { SignupDto } from '../dto/Signup.dto';
import { ExternalAuthService } from '../external-auth/external-auth.service';

interface AuthExtRequest {
    username: string;
    password: string;
}

export interface CustomSignupRequest extends AuthExtRequest{
    favSport: string;
}

@Injectable()
export class AuthService {
    constructor(private readonly extService: ExternalAuthService){}

    async signup(requestBody: SignupDto):Promise<SignupResponse> {
        try {
            const extRequest: CustomSignupRequest = {
                username: requestBody.emailId,
                password: requestBody.password,
                favSport: requestBody.favSport
            }
            const response = await this.extService.signup(extRequest);
    
            if(response && response?.$metadata?.httpStatusCode === 200){
                return {
                    statusCode: 200,
                    message: 'success',
                    data: null
                }
            }else throw new Error("Signup failed! Try again");
        } catch (error) {
            console.log("ERROR IN SIGNUP SERVICE: ", error);
            return {
                statusCode: 500,
                message: 'failure',
                data: error.message? error.message: null
            }
        }
    }

    async signin(requestBody: SigninDto):Promise<SigninResponse>{
        try {
            const extRequest: AuthExtRequest = {
                username: requestBody.emailId,
                password: requestBody.password
            }
            const response = await this.extService.signin(extRequest.username, extRequest.password);
            return response
        } catch (error) {
            console.log("ERROR IN SIGNIN: ",  error)
            return {
                statusCode: error.$metadata? error.$metadata.httpStatusCode : 401,
                message: "Authentication Failure",
                data: null
            }
        }

    }
}
