import { Router } from "express";
import { CheckoutController } from "../../controllers/checkout.controller";
import { isAuthenticatedSession } from "../../../shared/middleware/auth.middleware";

const router = Router();

// All checkout routes require authentication
router.get("/information", isAuthenticatedSession, CheckoutController.information);
router.post("/information", isAuthenticatedSession, CheckoutController.processInformation);
router.get("/shipping", isAuthenticatedSession, CheckoutController.shipping);
router.post("/shipping", isAuthenticatedSession, CheckoutController.processShipping);
router.get("/payment", isAuthenticatedSession, CheckoutController.payment);
router.post("/payment", isAuthenticatedSession, CheckoutController.processPayment);
router.get("/success", isAuthenticatedSession, CheckoutController.success);

export default router;