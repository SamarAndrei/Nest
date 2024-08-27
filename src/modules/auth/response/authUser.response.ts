import { IsString } from 'class-validator';

export class AuthUserResponse {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    token: string;
}
