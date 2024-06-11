import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Inject, Param, Post, Put, Render, Req, Res, UseGuards } from "@nestjs/common";
import { AdminGuard } from "./guards/admin.guard";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(
        @Inject('AUTH_SERVICE_TIENNT') private readonly authService: AuthService,
    ) { }

    @Get('create-account')
    @Render('create-account')
    createAccountPage() {
        return {};
    }

    @Post('create-account')
    async register(@Body() data: {
        email: string,    
        password: string,
        username: string,
        phone: string,
    }){
       try {
        console.log(data);
        
        var result = await this.authService.register(data);
        console.log(result);
        
        return {message: 'success'};
       } catch (error) {
        console.log(error);
       }
    }

    @Get('login')
    @Render('login')
    loginPage() {
        return {};
    }
    
    @Post('login')
    async login(@Body() data: { email: string, password: string }, @Res() res: any){
        var result = await this.authService.login(data.email, data.password);
        res.cookie('token', result, { httpOnly: true });
        res.send({status: 'success'});
    }

    // check -----------------------------------------------------
    @Get('home')
    @Render('client/home') 
    homePage() {
      return;
    }

    @Get('dashboard')
    @Render('admin/dashboard') 
    dashboardPage() {
      return;
    }

    @Get('page2')
    @Render('check-page2') 
    page2Page() {
      return;
    }

    @Get('page6')
    @Render('check-page6') 
    page6Page() {
      return;
    }

    @Get('page7')
    @Render('check-page7') 
    page7Page() {
      return;
    }
    @Get('viewProduct')
    @Render('viewProduct') 
    viewProductPage() {
      return;
    }
    
    

    
    // -----------------------------------

    // ! apis for admin

    @Get('admin/all-accounts')
    @UseGuards(AdminGuard)
    getAllAccounts() {
        return this.authService.getAllAccounts();
    }

    @Delete('admin/delete-account/:id')
    @UseGuards(AdminGuard)
    deleteAccount(@Param('id') id: string) {
        return this.authService.softDeleteAccount(id);
    }
    @Put('admin/undo-delete-account/:id')
    @UseGuards(AdminGuard)
    undoDeleteAccount(@Param('id') id: string) {
        return this.authService.undoDeleteAccount(id);
    }
 
}