import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './schemas/userModel.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name:UserModel.name,schema:UserSchema}],'abc'),//schema de modelo usuarios en mongo.
  ],
  providers: [UsersService],
  exports:[UsersService],
  controllers:[UsersController],

})
export class UsersModule {}
