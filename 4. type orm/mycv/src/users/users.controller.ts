import { Controller, Post, Body, Get, Param, Query, Delete, Patch, UseInterceptors } from '@nestjs/common';
import {CreateUserDto} from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post("/signup")
    createUser(@Body() body: CreateUserDto) {
        return this.userService.create(body.email, body.password);
    }

    @Get("/:id") 
    findUser(@Param('id') id:string) {
        console.log("handler is running");
        return this.userService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete("/:id") 
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }
}
