import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AdminGuard } from "./guards/admin.guard";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(
        @Inject('AUTH_SERVICE_TIENNT') private readonly authService: AuthService,
    ) { }

    @Post('register')
    register(@Body() data: any) {
        return this.authService.register(data);
    }

    @Post('login')
    login(@Body() data: any) {
        return this.authService.login(data.email, data.password);
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

    // ! features for user

}