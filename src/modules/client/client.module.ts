import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AccountEntity } from "src/entities/account.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '2h', algorithm: 'HS256' },
        }),
        TypeOrmModule.forFeature([AccountEntity]),
    ],
    controllers: [
        ClientController,
    ],
    providers: [
        {
            provide: 'AUTH_SERVICE_TIENNT',
            useClass: ClientService,
        }
    ],
    exports: [
        {
            provide: 'AUTH_SERVICE_TIENNT',
            useClass: ClientService,
        }
    ],
})
export class ClientModule { }