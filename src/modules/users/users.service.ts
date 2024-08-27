import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async getAll(): Promise<User[]> {
        try {
            return this.userModel.find().exec();
        } catch (e) {
            throw new Error(e);
        }
    }

    async getById(id: string): Promise<User> {
        try {
            return this.userModel.findById(id);
        } catch (e) {
            throw new Error(e);
        }
    }

    async getByEmail(email: string): Promise<User> {
        try {
            return this.userModel.findOne({ email: email });
        } catch (e) {
            throw new Error(e);
        }
    }

    async publicUser(email: string) {
        try {
            return this.userModel.findOne({ email: email }).select('-password');
        } catch (e) {
            throw new Error(e);
        }
    }

    async hashPassword(password: string): Promise<string> {
        try {
            return bcrypt.hash(
                password,
                parseInt(process.env.BCRYPT_ROUNDS, 10),
            );
        } catch (e) {
            throw new Error(e);
        }
    }

    async create(userDto: CreateUserDto): Promise<User> {
        try {
            userDto.password = await this.hashPassword(userDto.password);
            const newUser = new this.userModel(userDto);
            return await newUser.save();
        } catch (e) {
            throw new Error(e);
        }
    }

    async remove(id: string): Promise<User> {
        try {
            return this.userModel.findByIdAndDelete(id);
        } catch (e) {
            throw new Error(e);
        }
    }

    async update(id: string, userDto: UpdateUserDto): Promise<User> {
        try {
            if (userDto.password) {
                userDto.password = await this.hashPassword(userDto.password);
            }
            return this.userModel.findByIdAndUpdate(id, userDto, {
                new: false,
            });
        } catch (e) {
            throw new Error(e);
        }
    }
}
