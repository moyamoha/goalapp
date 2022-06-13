import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserService } from './user.service';

@Injectable()
export class TasksService {
  constructor(private userService: UserService) {}
  @Cron('* 1-3 2 * * *') // Every day 2 oclock UTC
  async handleCron() {
    const users = await this.userService.getAll();
    for (const user of users) {
      console.log(user);
      const monthsToDelete = user.profile ? user.profile.monthsToDelete : 6;
      if (
        user.lastLoggedIn &&
        Date.now() - Date.parse(user.lastLoggedIn.toISOString()) >=
          monthsToDelete * 2629800000
      ) {
        // If inactive for monthsToDelete number of months, delete user
        this.userService.deleteUser(user._id);
      }
    }
  }
}
