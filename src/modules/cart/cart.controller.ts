import { Controller, Get, Post, Delete, Put, Body, Param, Req, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { Request, Response } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  viewCart(@Req() req: Request) {
    return this.cartService.getCart(req);
  }

  @Post('add')
  addToCart(@Body() item: any, @Req() req: Request, @Res() res: Response) {
    return this.cartService.addToCart(item, req, res);
  }

  @Delete('remove/:id')
  removeFromCart(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    return this.cartService.removeFromCart(id, req, res);
  }

  @Put('update/:id')
  updateCartItem(@Param('id') id: string, @Body() item: any, @Req() req: Request, @Res() res: Response) {
    return this.cartService.updateCartItem(id, item, req, res);
  }

  @Post('save')
  saveCart(@Req() req: Request, @Res() res: Response) {
    return this.cartService.saveCart(req, res);
  }
}
