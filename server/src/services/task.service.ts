import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserService } from './user.service';

@Injectable()
export class TasksService {
  constructor(
    private userService: UserService,
    private mailService: MailerService,
  ) {}

  // This task delete users that have been inactive for the amount of months that they have setted in their account
  // which in turn defines to delete their account after being inactive for that amount of time.
  @Cron('* 1-2 2 * * *') // Every day 2 oclock UTC
  async handleCron() {
    const users = await this.userService.getAll();
    for (const user of users) {
      const monthsToDelete = user.monthsToDelete;
      const email = user.email;
      const name = user.firstname + ' ' + user.lastname;
      if (
        user.lastLoggedIn &&
        Date.now() - Date.parse(user.lastLoggedIn.toISOString()) >=
          monthsToDelete * 2629800000
      ) {
        // If inactive for monthsToDelete number of months, delete user
        this.userService.deleteUser(user._id);
        await this.mailService.sendMail({
          from: process.env.EMAIL_SENDER,
          to: email,
          subject: 'Your account was DELETED',
          html: `<strong>
            Dear ${name}!
          </strong><br></br>
            <p>Your account was inactive for too long, so we deleted it. If you still want to use our services, you can create a new one
            <a href="https://goalie.netlify.app">here</a>
          </p>`,
        });
      }
    }
  }
}
