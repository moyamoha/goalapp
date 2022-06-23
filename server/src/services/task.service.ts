import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserService } from './user.service';

@Injectable()
export class TasksService {
  constructor(private userService: UserService) {}

  // This task delete users that have been inactive for the amount of months that they have setted in their account
  // which in turn defines to delete their account after being inactive for that amount of time.
  @Cron('* 1-2 2 * * *') // Every day 2 oclock UTC
  async handleCron() {
    const users = await this.userService.getAll();
    for (const user of users) {
      const monthsToDelete = user.monthsToDelete;
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
