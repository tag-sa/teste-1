import { Injectable, Query } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers(@Query() filters) {
    const { name, email, page, pageSize } = filters;
    return this.userRepository.findAll(name, email, +page, +pageSize);
  }

  getUserById(userId: string) {
    return this.userRepository.find(userId);
  }

  async createUser(user) {
    return this.userRepository.create(user);
  }

  async updateUserById(userId, user) {
    return this.userRepository.update(userId, user);
  }

  async deleteUserById(userId: number) {
    return this.userRepository.delete(userId);
  }
}
