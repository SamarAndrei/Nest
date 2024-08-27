import { IsDateString, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsDateString()
    date: Date;

    @IsNumber()
    quantity: number;
}
