import { Injectable } from '@nestjs/common';
import { ExternalAuthConfig } from './externalAuth.config';
import { CustomSignupRequest } from '../auth/auth.service';
import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    InitiateAuthRequest,
    SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';


@Injectable()
export class ExternalAuthService {
    private readonly providerClient: CognitoIdentityProviderClient;

    constructor(private readonly authConfig: ExternalAuthConfig) {
        this.providerClient = new CognitoIdentityProviderClient({
            region: this.authConfig.region
        });
    }

    async signup(params: CustomSignupRequest){
        try {
            const input = {
                ClientId: this.authConfig.clientId,
                Password: params.password,
                Username: params.username,
                UserAttributes: [
                    {
                        Name: 'custom:fav_sports',
                        Value: params.favSport
                    }
                ]
            }
            const signupCommand = new SignUpCommand(input);
            const response = await this.providerClient.send(signupCommand);
            return response;
        } catch (error) {
            console.log("ERROR IN EXTERNAL SIGNUP: ",  error);
            throw error 
        }

    }  

    async signin(username: string, password: string){
        try {
            const input: InitiateAuthRequest = {
                AuthFlow: "USER_PASSWORD_AUTH",
                ClientId: this.authConfig.clientId,
                AuthParameters:{
                    PASSWORD: password,
                    USERNAME: username
                }
            }
            const initiateAuthCommand = new InitiateAuthCommand(input);
            const response = await this.providerClient.send(initiateAuthCommand);
            if(response.$metadata.httpStatusCode!==200) {
                return {
                    statusCode: response.$metadata.httpStatusCode,
                    message: "Authentication Failure",
                    data: null
                }
            }
            return {
                statusCode: response.$metadata.httpStatusCode,
                message: "success",
                data: {
                    token: response.AuthenticationResult.IdToken,
                    username: username
                }
            }
            
        } catch (error) {
            console.log("ERROR IN EXTERNAL SIGNIN: ",  error)
            return {
                statusCode: error.$metadata? error.$metadata.httpStatusCode : 401,
                message: "Authentication Failure",
                data: null
            }
        }
        
    }
}
