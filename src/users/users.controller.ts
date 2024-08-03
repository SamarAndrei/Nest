import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @HttpCode(HttpStatus.FOUND)
    getAll() {
        return this.usersService.getAll;
    }

    @Get()
    @HttpCode(HttpStatus.FOUND)
    getById(@Param('id') id: string) {
        return this.usersService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

    @Patch()
    @HttpCode(HttpStatus.OK)
    update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
        return this.usersService.update(id, updateUserDto);
    }
}
