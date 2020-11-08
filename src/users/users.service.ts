import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userDocument, UserModel } from './schemas/userModel.schema';
import {Model} from 'mongoose';
import { createUserDTO } from './dto/createUser.dto';
import { messageInterface } from './interface/message.interface';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(UserModel.name) private readonly userModel:Model<userDocument>
    ){}

    allUsers():UserModel[]{
        return this.userModel.find({status:true},{password:0,status:0}).exec();
    }
    usersId(idUser:string):UserModel{
        return this.userModel.findOne({_id:idUser,status:true},{password:0,status:0}).exec();
    }
    async createUser(user:createUserDTO):Promise<messageInterface>{
        const existEmail = await this.userModel.findOne({emailid:user.emailid})
        console.log(existEmail);
        
        if(existEmail!==null) return {
            message:'el email ya existe!',
            status:false
        }

        const existContact = await this.userModel.findOne({ contact :user.contact})
        
        if(existContact!==null) return {
            message:'el contacto ya existe!',
            status:false
        }
        const model = this.userModel(user);
        try{
            await model.save()
        }catch{
            return {
                status:false,
                message:'error'
            }
        }

        return {
            status:true,
            message:'usuario creado.'
        }
    }
    async updateUser(idUser:string,data:createUserDTO):Promise<messageInterface>{
        const existUser = await this.userModel.findOne({_id:idUser,status:true}).exec();  

        if(existUser!==null){
            try{
                await this.userModel.updateOne({_id:idUser},{name:data.name,contact:data.contact,type:data.type});
                return {message:'Usuario actualizado!',status:true}
            }catch(error){
                return {message:'Error al actualizar Usuario! ' + error,status:false}
            }
        }
        return {message:'Error el usuario no existe...',status:false}
    }
    async deleteUser(idUser:string):Promise<messageInterface>{
        const existUser = await this.userModel.findOne({_id:idUser,status:true}).exec();
        
        if(existUser!==null){
            try{
                await this.userModel.updateOne({_id:idUser,status:true},{status:false});
                return {message:'Usuario eliminado!',status:true}
            }catch(error){
                return {message:'Error al eliminar Usuario! ' + error,status:false}
            }
        }
        return {message:'Error el usuario no existe...',status:false}
    }
}
