import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserModel } from './schemas/userModel.schema';
import { createUserDTO } from './dto/createUser.dto';
import { messageInterface } from './interface/message.interface';
import { UsersService } from './users.service';

@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
    constructor(
        private readonly userModule:UsersService
    ){}
    @Get()
    getAllUsers():UserModel[]{
        return this.userModule.allUsers();
    }
    @Get('/:id')
    getUsersId(
        @Param('id') id:string
    ):UserModel{
        return this.userModule.usersId(id);
    }
    @Post('/create')
    async postUser(
        @Body() body:createUserDTO
    ):Promise<messageInterface>{
        return this.userModule.createUser(body);
    }
    @Put('/:id')
    async updateUser(
        @Param('id') idUser:string,
        @Body() data:createUserDTO
    ):Promise<messageInterface>{
        return this.userModule.updateUser(idUser,data);
    }
    @Delete('/:id')
    async deleteUser(
        @Param('id') idUser:string
    ):Promise<messageInterface>{
        return this.userModule.deleteUser(idUser);
    }
    @Post('/restore/:id')
    async restoreUserId( @Param('id') idUser:string){
        return this.userModule.restoreUserId(idUser);
    }
}
