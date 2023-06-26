import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrentUserService {
  private currenteUser: number;
  setCurrentUser(userId) {
    this.currenteUser = userId;
  }

  getCurrentuser() {
    return this.currenteUser;
  }
}
