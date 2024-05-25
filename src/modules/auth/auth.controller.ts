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
        var result = await this.authService.register(data);
        console.log(result);
        
        return {message: 'success'};
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

   @Get('home')
   @Render('client/home')
   homePage(){
    return;
   } 
   
   
    @Get('dashboard')
    @Render('admin/dashboard') 
    getDashboard() {
      return { message: 'Welcome to the admin dashboard!' }; 
    }
}