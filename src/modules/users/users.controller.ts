import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @HttpCode(HttpStatus.FOUND)
    getAll() {
        return this.usersService.getAll();
    }

    // @Get(':id')
    // @HttpCode(HttpStatus.FOUND)
    // getById(@Param('id') id: string) {
    //     return this.usersService.getById(id);
    // }

    // @Post()
    // @HttpCode(HttpStatus.CREATED)
    // create(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.create(createUserDto);
    // }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    remove(@Param('id') id: string): Promise<User> {
        return this.usersService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Body() updateUserDto: UpdateUserDto,
        @Param('id') id: string,
    ): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }
}
