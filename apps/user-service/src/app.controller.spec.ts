import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getUser', () => {
    it('should return a user mock response', () => {
      expect(appController.getUser({ id: '123' })).toEqual({
        id: '123',
        name: 'User 123',
        email: 'user123@example.com',
      });
    });
  });
});
