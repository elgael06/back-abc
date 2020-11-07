import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userDocument, UserModel } from './schemas/userModel.schema';
import {Model} from 'mongoose';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(UserModel.name) private readonly userModel:Model<userDocument>
    ){}

    allUsers(){
        return this.userModel.find().exec();
    }
}
