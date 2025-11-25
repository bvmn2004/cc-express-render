"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../../controllers/cart.controller");
const router = (0, express_1.Router)();
router.get("/", cart_controller_1.CartController.index);
router.post("/add/:slug", cart_controller_1.CartController.add);
router.post("/remove/:slug", cart_controller_1.CartController.remove);
exports.default = router;
//# sourceMappingURL=cart.route.js.map