import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { User } from '../users/schemas/user.schema';
import { UserLoginDto } from './dto/login.dto';
import { AuthUserResponse } from './response/authUser.response';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(201)
    @Post('register')
    register(@Body() userDto: CreateUserDto): Promise<User> {
        return this.authService.registerUsers(userDto);
    }

    @HttpCode(200)
    @Post('login')
    login(@Body() userDto: UserLoginDto): Promise<AuthUserResponse> {
        return this.authService.loginUser(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test() {
        return true;
    }
}
