import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: process.cwd() + '/.env' });

const port = process.env.PORT || 3000;
// mongoose
//     .connect(process.env.DB_URL)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.log(`DB connection error ${err}`));

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(port, () =>
        console.log(`server is listening on port: ${port}`),
    );
}

bootstrap();
