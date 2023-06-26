import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seeders/seeder.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };

  // const seedService = new SeedService();
  // await seedService.seed();
  app.enableCors(corsOptions);

  await app.listen(3001);
}
bootstrap();
