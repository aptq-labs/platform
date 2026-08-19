import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ThrottlerGuard } from '@nestjs/throttler';
import { of } from 'rxjs';

describe('AppController', () => {
  let appController: AppController;
  let mockUserService: { getUser: jest.Mock };

  beforeEach(async () => {
    mockUserService = {
      getUser: jest
        .fn()
        .mockReturnValue(
          of({ id: '1', name: 'John Doe', email: 'john@example.com' }),
        ),
    };

    const mockClientGrpc = {
      getService: jest.fn().mockReturnValue(mockUserService),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: 'USER_PACKAGE',
          useValue: mockClientGrpc,
        },
      ],
    })
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: () => true })
      .compile();

    appController = app.get<AppController>(AppController);
    appController.onModuleInit();
  });

  describe('getUser', () => {
    it('should return user info', (done) => {
      appController.getUser('1').subscribe((result) => {
        expect(result).toEqual({
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
        });
        expect(mockUserService.getUser).toHaveBeenCalledWith({ id: '1' });
        done();
      });
    });
  });
});
