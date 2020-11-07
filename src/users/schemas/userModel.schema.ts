import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document,Schema as schema}  from 'mongoose';

export type userDocument = UserModel & Document;

@Schema()
export class UserModel {
    @Prop({required:true})
    name:string;
    @Prop({required:true})
    password:String;
    @Prop({required:true,unique:true})
    emailid:String;
    @Prop({required:true,unique:true})
    contact:String;
    @Prop({required:false})
    avatar:String;
    @Prop({required:true,default:`EMPLOYE`})
    type:String;
    @Prop({required:true,default:1})
    status:Boolean;
    @Prop({type: schema.Types.ObjectId,ref: 'UserModel'})
    createdBy;
}

export const UserSchema = SchemaFactory.createForClass(UserModel); 

