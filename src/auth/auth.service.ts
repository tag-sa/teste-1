import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PrismaService } from 'src/modules/prisma';

import { Prisma, users } from '@prisma/client';

@Injectable()
export class AuthService {
  private currenteUser;
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(userId: number): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  async validateUser(email: string, password: string): Promise<users | null> {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  setCurrentUser(userId) {
    this.currenteUser = userId;
  }

  getCurrentuser() {
    return this.currenteUser;
  }
}
