import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: process.cwd() + '/.env' });

@Module({
    imports: [UsersModule, MongooseModule.forRoot(process.env.DB_URL)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
