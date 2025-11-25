"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const cart_repository_1 = require("../infrastructure/repositories/cart.repository");
const cartRepo = new cart_repository_1.CartRepository();
class CartService {
    addToCart(userId_1, productId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, productId, quantity = 1) {
            const cart = yield cartRepo.getOrCreateCart(userId);
            yield cartRepo.addItem(cart.id, productId, quantity);
            return cartRepo.getCartItems(cart.id);
        });
    }
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartRepo.getOrCreateCart(userId);
            return cartRepo.getCartItems(cart.id);
        });
    }
    removeFromCart(userId, productSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            return cartRepo.removeItemByProductSlug(userId, productSlug);
        });
    }
    getCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return cartRepo.getCartItemsByUserId(userId);
        });
    }
    clearCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return cartRepo.clearCart(userId);
        });
    }
}
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map