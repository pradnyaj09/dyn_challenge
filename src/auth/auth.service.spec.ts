import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ExternalAuthService } from '../external-auth/external-auth.service';
import { ExternalAuthConfig } from '../external-auth/externalAuth.config';
import { SignupDto } from 'src/dto/Signup.dto';
import { SigninDto } from 'src/dto/SigninDto';

describe('AuthService', () => {
  let service: AuthService;
  let externalAuthService: ExternalAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, 
        ExternalAuthConfig,
        {
          provide: ExternalAuthService,
          useValue:{
            signup: jest.fn(),
            signin: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    externalAuthService = module.get<ExternalAuthService>(ExternalAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should return success response on valid signup', async () => {
      const signupDto: SignupDto = {
        emailId: 'test@example.com',
        password: 'password123',
        favSport: 'Basketball',
      };

      jest.spyOn(externalAuthService, 'signup').mockResolvedValue({
        '$metadata': {
          httpStatusCode: 200,
          requestId: 'b67199b1-0b92-4037-87db-4ddcf99a22b2',
          extendedRequestId: undefined,
          cfId: undefined,
          attempts: 1,
          totalRetryDelay: 0
        },
        UserConfirmed: true,
        UserSub: '514b55c0-d021-70cf-aa27-f8d80050c631'
      });

      const result = await service.signup(signupDto);
      
      expect(result).toEqual({
        statusCode: 200,
        message: 'success',
        data: null,
      });
      expect(externalAuthService.signup).toHaveBeenCalledWith({
        username: signupDto.emailId,
        password: signupDto.password,
        favSport: signupDto.favSport,
      });
    });


    it('should return failure response on invalid signup', async () => {
      const signupDto: SignupDto = {
        emailId: 'test@example.com',
        password: 'password123',
        favSport: 'Basketball',
      };

      jest.spyOn(externalAuthService, 'signup').mockRejectedValue({
        '$metadata': {
          httpStatusCode: 400,
          requestId: 'b67199b1-0b92-4037-87db-4ddcf99a22b2',
          extendedRequestId: undefined,
          cfId: undefined,
          attempts: 1,
          totalRetryDelay: 0
        },
        UserConfirmed: true,
        UserSub: '514b55c0-d021-70cf-aa27-f8d80050c631'
      });

      const result = await service.signup(signupDto);
      
      expect(result).toEqual({
        statusCode: 500,
        message: 'failure',
        data: null,
      });
      expect(externalAuthService.signup).toHaveBeenCalledWith({
        username: signupDto.emailId,
        password: signupDto.password,
        favSport: signupDto.favSport,
      });
    });
  });

  describe('signin', () => {
    const signinDto: SigninDto = {
      emailId: 'test@example.com',
      password: 'password123'
    };
    it('should return success response on valid signin', async () => {
      jest.spyOn(externalAuthService, 'signin').mockResolvedValue({
        statusCode: 200,
        message: 'success',
        data: {
          token: 'abc123',
          username: 'test@example.com'
        }
      });

      const result = await service.signin(signinDto);
      
      expect(result).toEqual({
        statusCode: 200,
        message: 'success',
        data: {
          token: 'abc123',
          username: 'test@example.com'
        },
      });
      expect(externalAuthService.signin).toHaveBeenCalledWith(signinDto.emailId, signinDto.password);
    });



  });
});
