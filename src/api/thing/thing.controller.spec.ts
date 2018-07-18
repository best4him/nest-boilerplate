import { Test, TestingModule } from '@nestjs/testing';
import { ThingController } from './thing.controller';
import { ThingService } from './thing.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ThingController],
      providers: [ThingService],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<ThingController>(ThingController);
      expect(appController.findAll()).toHaveLength(1);
    });
  });
});
