import {
    Controller, Get, Post, Delete,
    Body, Param, ParseIntPipe, HttpCode
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(201)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
    return this.usersService.findAll();
}
 
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
     return this.usersService.findOne(id);
  }
 
   @Delete(':id')
   @HttpCode(204)
   remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}