"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkout_controller_1 = require("../../controllers/checkout.controller");
const auth_middleware_1 = require("../../../shared/middleware/auth.middleware");
const router = (0, express_1.Router)();
// All checkout routes require authentication
router.get("/information", auth_middleware_1.isAuthenticatedSession, checkout_controller_1.CheckoutController.information);
router.post("/information", auth_middleware_1.isAuthenticatedSession, checkout_controller_1.CheckoutController.processInformation);
router.get("/shipping", auth_middleware_1.isAuthenticatedSession, checkout_controller_1.CheckoutController.shipping);
router.post("/shipping", auth_middleware_1.isAuthenticatedSession, checkout_controller_1.CheckoutController.processShipping);
router.get("/payment", auth_middleware_1.isAuthenticatedSession, checkout_controller_1.CheckoutController.payment);
router.post("/payment", auth_middleware_1.isAuthenticatedSession, checkout_controller_1.CheckoutController.processPayment);
router.get("/success", auth_middleware_1.isAuthenticatedSession, checkout_controller_1.CheckoutController.success);
exports.default = router;
//# sourceMappingURL=checkout.route.js.map