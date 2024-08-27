import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    async generateJwt(user) {
        const payload = { user };
        return this.jwtService.signAsync(payload);
    }
}
