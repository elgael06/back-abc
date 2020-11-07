import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from '../users/users.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/abc', {connectionName: 'abc' }),
    UsersModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
