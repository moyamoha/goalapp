import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { GoalModule } from './goal.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { TodoModule } from './todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? process.env.MONGO_URL
        : process.env.MONGO_URL,
    ),
    GoalModule,
    UserModule,
    AuthModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
