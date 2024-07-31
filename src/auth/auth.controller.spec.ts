import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ExternalAuthService } from '../external-auth/external-auth.service';
import { ExternalAuthConfig } from '../external-auth/externalAuth.config';
import { SignupDto } from 'src/dto/Signup.dto';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            signin: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return response on signin api call', async () => {
    const signupDto: SignupDto = {
      emailId: 'test@example.com',
      password: 'password123',
      favSport: 'Basketball',
    };
    const signupResponse = {
      statusCode: 200,
      message: 'success',
      data: null,
    }
    jest.spyOn(service, 'signup').mockResolvedValue(signupResponse);
    const response = {
      send: jest.fn()
    } as unknown as Response;
    await controller.signup(signupDto, response);
    expect(response.send).toHaveBeenCalledWith(signupResponse)
    expect(service.signup).toHaveBeenCalledWith(signupDto);
  });
});
