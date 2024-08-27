import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { User } from 'src/decorators/user.decorator';
import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly orderService: OrdersService,
        @Inject('ORDERS_SERVICE') private readonly client: ClientProxy,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.client.send('get_one_order', id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@User() user) {
        const userEmail = user.user;
        return this.client.send('get_all_order', userEmail);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() orderDto: CreateOrderDto, @User() user) {
        const userEmail = user.user;
        return this.client.send('order_created', { ...orderDto, userEmail });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.client.send('deleted_order', id);
    }
}
