import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CurrentUserService } from '../../currentUser/currentUser.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../auth/jwt.strategy';
import { jwtConstants } from '../../auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }, // Defina a duração do token JWT
    }),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    PrismaService,
    CurrentUserService,
    JwtStrategy,
  ],
})
export class ProductsModule {}
