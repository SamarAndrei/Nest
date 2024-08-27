import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
        UsersModule,
        MongooseModule.forRoot(process.env.DB_URL),
        AuthModule,
        TokenModule,
        OrdersModule,
    ],
})
export class AppModule {}
