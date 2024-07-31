import { Test, TestingModule } from '@nestjs/testing';
import { ExternalAuthService } from './external-auth.service';
import { ExternalAuthConfig } from './externalAuth.config';
import { ConfigModule } from '@nestjs/config';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
jest.mock('amazon-cognito-identity-js', ()=>{
  return{
    CognitoUserPool: jest.fn()
  }
});
jest.mock('@aws-sdk/client-cognito-identity-provider', ()=>{
  return {
    CognitoIdentityProviderClient: jest.fn()
  }
});

describe('ExternalAuthService', () => {
  let service: ExternalAuthService;
  let externalAuthConfig: ExternalAuthConfig;

  beforeEach(async () => {

    process.env.AWS_COGNITO_USER_POOL_ID = 'abc123';
    process.env.AWS_COGNITO_CLIENT_ID = 'abc123';
    process.env.AWS_COGNITO_REGION = 'abc123'; 
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExternalAuthService, 
        ExternalAuthConfig
      ],
    }).compile();

    service = module.get<ExternalAuthService>(ExternalAuthService);
    externalAuthConfig = module.get<ExternalAuthConfig>(ExternalAuthConfig);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize with correct config', () => {

    expect(externalAuthConfig.userPoolId).toBe("abc123");
    expect(externalAuthConfig.clientId).toBe("abc123");
    expect(externalAuthConfig.region).toBe("abc123");
  });
});
