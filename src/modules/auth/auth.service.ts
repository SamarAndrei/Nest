import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { User } from '../users/schemas/user.schema';
import { AppErrors } from 'src/errors/errors';
import { UserLoginDto } from './dto/login.dto';
import { TokenService } from '../token/token.service';
import { AuthUserResponse } from './response/authUser.response';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
    ) {}

    async registerUsers(userDto: CreateUserDto): Promise<User> {
        try {
            const exist_user = await this.usersService.getByEmail(
                userDto.email,
            );
            if (exist_user) throw new BadRequestException(AppErrors.USER_EXIST);
            return this.usersService.create(userDto);
        } catch (e) {
            throw new Error(e);
        }
    }

    async loginUser(userDto: UserLoginDto): Promise<AuthUserResponse> {
        try {
            const exist_user = await this.usersService.getByEmail(
                userDto.email,
            );
            if (!exist_user)
                throw new BadRequestException(AppErrors.USER_EXIST);
            const validate_password = await bcrypt.compare(
                userDto.password,
                exist_user.password,
            );
            if (!validate_password)
                throw new BadRequestException(AppErrors.WRONG_DATA);
            const token = await this.tokenService.generateJwt(userDto.email);
            const public_user = await this.usersService.publicUser(
                userDto.email,
            );
            return { ...public_user, token };
        } catch (e) {
            throw new Error(e);
        }
    }
}
