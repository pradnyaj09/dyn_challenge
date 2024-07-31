import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from '../dto/Signup.dto';
import { SigninDto } from '../dto/SigninDto';

export interface APIResponse {
    statusCode: number;
    message: string;
}

export interface SignupResponse extends APIResponse{
    data: null;
}

export interface SigninResponse extends APIResponse{
    data: {
        token: string;
        username: string
    };
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    async signup(@Body() signupDto: SignupDto, @Res() response: Response): Promise<Response> {
        const signupResponse = await this.authService.signup(signupDto);
        return response.send(signupResponse);
    }

    @Post('/signin')
    async signin(@Body() signinDto: SigninDto, @Res() response: Response): Promise<Response> {
        const signinResponse = await this.authService.signin(signinDto);
        return response.send(signinResponse);
    }
}
