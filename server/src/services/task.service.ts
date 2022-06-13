import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserService } from './user.service';

@Injectable()
export class TasksService {
  constructor(private userService: UserService) {}
  @Cron('* * 2 * * *') // Every day 2 oclock UTC
  async handleCron() {
    const users = await this.userService.getAll();
    for (const user of users) {
      console.log(user);
      if (
        user.lastLoggedIn &&
        Date.now() - Date.parse(user.lastLoggedIn.toISOString()) >=
          6 * 2629800000
      ) {
        // If inactive for 6 months, delete user
        this.userService.deleteUser(user._id);
      }
    }
  }
}
