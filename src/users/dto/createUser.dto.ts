import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
 
export class createUserDTO{
    @IsString()
    name:string;
    @IsString()
    password:string;
    @IsEmail()
    emailid:String;
    @IsString()
    @Length(13,13)
    contact:string;
    @IsString({always:false})
    avatar:String;
    @IsString()
    @IsNotEmpty()
    type:String;

}