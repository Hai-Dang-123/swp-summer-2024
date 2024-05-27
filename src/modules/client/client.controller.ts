import { Controller,Get, Inject, Render } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
    buyService: any;
     
    constructor(
        @Inject('AUTH_SERVICE_TIENNT') private readonly clientService: ClientService,

    ){}

    @Get('home')
    @Render('client/home')
    homePage(){
        return;
    }
    @Get('buy')
    @Render('client/buy-item')
    getBuy(){
       
       return;
    }
}