import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { getCartFromCookie, saveCartToCookie, convertCartToString } from './utils';

@Injectable()
export class CartService {
  getCart(req: Request) {
    const cart = getCartFromCookie(req);
    return cart || [];
  }

  addToCart(item: any, req: Request, res: Response) {
    let cart = getCartFromCookie(req);
    cart = cart || [];
    cart.push(item);
    saveCartToCookie(cart, res);
    return cart;
  }

  removeFromCart(id: string, req: Request, res: Response) {
    let cart = getCartFromCookie(req);
    cart = cart.filter(item => item.id !== id);
    saveCartToCookie(cart, res);
    return cart;
  }

  updateCartItem(id: string, item: any, req: Request, res: Response) {
    let cart = getCartFromCookie(req);
    const index = cart.findIndex(i => i.id === id);
    if (index !== -1) {
      cart[index] = item;
    }
    saveCartToCookie(cart, res);
    return cart;
  }

  saveCart(req: Request, res: Response) {
    const cart = getCartFromCookie(req);
    saveCartToCookie(cart, res);
    return cart;
  }
}
