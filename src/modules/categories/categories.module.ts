import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { CurrentUserService } from '../../currentUser/currentUser.service';
import { JwtStrategy } from '../../auth/jwt.strategy';
import { jwtConstants } from '../../auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }, // Defina a duração do token JWT
    }),
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoriesRepository,
    PrismaService,
    CurrentUserService,
    JwtStrategy,
  ],
})
export class CategoriesModule {}
