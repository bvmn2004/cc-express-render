import { CartRepository } from "../infrastructure/repositories/cart.repository";

const cartRepo = new CartRepository();

export class CartService {
    async addToCart(userId: number, productId: number, quantity: number = 1) {
        const cart = await cartRepo.getOrCreateCart(userId);
        await cartRepo.addItem(cart.id, productId, quantity);
        return cartRepo.getCartItems(cart.id);
    }

    async getCart(userId: number) {
        const cart = await cartRepo.getOrCreateCart(userId);
        return cartRepo.getCartItems(cart.id);
    }

    async removeFromCart(userId: number, productSlug: string) {
        return cartRepo.removeItemByProductSlug(userId, productSlug);
    }

    async getCartByUserId(userId: number) {
        return cartRepo.getCartItemsByUserId(userId);
    }

    async clearCart(userId: number) {
        return cartRepo.clearCart(userId);
    }
}