import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { UserModule } from './modules/users/user.module';
import { SeedService } from './seeders/seeder.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { CurrentUserService } from './currentUser/currentUser.service';
import { SchemaModule } from './schema/schema.module';

@Module({
  imports: [
    PrismaModule,
    CategoriesModule,
    ProductsModule,
    UserModule,
    SeedService,

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    SchemaModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, JwtStrategy, AuthService, CurrentUserService],
})
export class AppModule {}
