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
exports.CheckoutController = void 0;
const order_service_1 = require("../../application/order.service");
const auth_repository_1 = require("../../infrastructure/repositories/auth.repository");
const cart_service_1 = require("../../application/cart.service");
const orderService = new order_service_1.OrderService();
const authRepository = new auth_repository_1.AuthRepository();
const cartService = new cart_service_1.CartService();
// Shipping methods mapping
const SHIPPING_METHODS = {
    "001": { name: "Ground", price: 9.99 },
    "002": { name: "2-Day Express", price: 15.99 },
    "003": { name: "Overnight", price: 21.99 },
    "005": { name: "Store Pickup", price: 0.0 },
};
class CheckoutController {
    static information(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = req.session;
                const user = session.user; // User is guaranteed to exist due to authentication middleware
                if (!user) {
                    return res.redirect("/auth/login");
                }
                // Load cart from database
                const cart = yield cartService.getCart(user.id);
                if (!cart || cart.length === 0) {
                    return res.redirect("/cart");
                }
                // Get user details from database to pre-fill form
                const userDetails = yield authRepository.getById(user.id);
                // Pre-fill checkout information from user profile or session
                let checkoutInfo = session.checkoutInfo;
                if (!checkoutInfo && userDetails) {
                    // Parse full_name to firstName and lastName if available
                    const nameParts = userDetails.full_name ? userDetails.full_name.split(" ") : [];
                    const firstName = nameParts[0] || "";
                    const lastName = nameParts.slice(1).join(" ") || "";
                    checkoutInfo = {
                        email: userDetails.email || user.email || "",
                        firstName: firstName,
                        lastName: lastName,
                        phone: userDetails.phone || "",
                        // Address fields can be parsed if stored as a single address field
                        address1: userDetails.address || "",
                        address2: "",
                        city: "",
                        state: "",
                        zip: "",
                        country: "",
                    };
                }
                // Calculate totals
                const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * (item.qty || item.quantity || 0), 0);
                res.render("areas/client/checkout/information", {
                    layout: "default-layout",
                    title: "Checkout - Luka Store",
                    cart,
                    total: subtotal,
                    checkoutInfo: checkoutInfo || null,
                });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    static processInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = req.session;
                const user = session.user;
                if (!user || !user.id) {
                    return res.redirect("/auth/login");
                }
                // Load cart from database
                const cart = yield cartService.getCart(user.id);
                if (!cart || cart.length === 0) {
                    return res.redirect("/cart");
                }
                const { email, firstName, lastName, address1, address2, city, state, zip, country, phone, } = req.body;
                // Validate required fields
                if (!email || !firstName || !lastName || !address1 || !city || !state || !zip || !country) {
                    return res.status(400).send("Missing required fields");
                }
                // Store checkout information in session
                session.checkoutInfo = {
                    email,
                    firstName,
                    lastName,
                    address1,
                    address2: address2 || "",
                    city,
                    state,
                    zip,
                    country,
                    phone: phone || "",
                };
                // Save session and redirect to shipping
                session.save((err) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.redirect("/checkout/shipping");
                });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    static shipping(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const session = req.session;
                const user = session.user;
                if (!user || !user.id) {
                    return res.redirect("/auth/login");
                }
                // Load cart from database
                const cart = yield cartService.getCart(user.id);
                const checkoutInfo = session.checkoutInfo;
                if (!cart || cart.length === 0) {
                    return res.redirect("/cart");
                }
                if (!checkoutInfo) {
                    return res.redirect("/checkout/information");
                }
                const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * (item.qty || item.quantity || 0), 0);
                const shippingCost = session.shippingMethod
                    ? ((_a = SHIPPING_METHODS[session.shippingMethod]) === null || _a === void 0 ? void 0 : _a.price) || 0
                    : 0;
                const total = subtotal + shippingCost;
                // Format address for display
                const formattedAddress = `${checkoutInfo.address1}${checkoutInfo.address2 ? ", " + checkoutInfo.address2 : ""}, ${checkoutInfo.city}, ${checkoutInfo.state} ${checkoutInfo.zip}, ${checkoutInfo.country}`;
                res.render("areas/client/checkout/shipping", {
                    layout: "default-layout",
                    title: "Shipping Method - Luka Store",
                    checkoutInfo,
                    formattedAddress,
                    cart,
                    total,
                    shippingMethods: SHIPPING_METHODS,
                    selectedShippingMethod: session.shippingMethod || "005",
                });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    static processShipping(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = req.session;
                const user = session.user;
                if (!user || !user.id) {
                    return res.redirect("/auth/login");
                }
                // Load cart from database
                const cart = yield cartService.getCart(user.id);
                const checkoutInfo = session.checkoutInfo;
                if (!cart || cart.length === 0) {
                    return res.redirect("/cart");
                }
                if (!checkoutInfo) {
                    return res.redirect("/checkout/information");
                }
                const { shippingMethodId } = req.body;
                if (!shippingMethodId || !SHIPPING_METHODS[shippingMethodId]) {
                    return res.status(400).send("Invalid shipping method");
                }
                // Store shipping method in session
                session.shippingMethod = shippingMethodId;
                // Save session and redirect to payment
                session.save((err) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.redirect("/checkout/payment");
                });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    static payment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const session = req.session;
                const user = session.user;
                if (!user || !user.id) {
                    return res.redirect("/auth/login");
                }
                // Load cart from database
                const cart = yield cartService.getCart(user.id);
                const checkoutInfo = session.checkoutInfo;
                const shippingMethodId = session.shippingMethod;
                if (!cart || cart.length === 0) {
                    return res.redirect("/cart");
                }
                if (!checkoutInfo) {
                    return res.redirect("/checkout/information");
                }
                if (!shippingMethodId) {
                    return res.redirect("/checkout/shipping");
                }
                const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * (item.qty || item.quantity || 0), 0);
                const shippingCost = ((_a = SHIPPING_METHODS[shippingMethodId]) === null || _a === void 0 ? void 0 : _a.price) || 0;
                const total = subtotal + shippingCost;
                // Format address for display
                const formattedAddress = `${checkoutInfo.address1}${checkoutInfo.address2 ? ", " + checkoutInfo.address2 : ""}, ${checkoutInfo.city}, ${checkoutInfo.state} ${checkoutInfo.zip}, ${checkoutInfo.country}`;
                const shippingMethod = SHIPPING_METHODS[shippingMethodId];
                res.render("areas/client/checkout/payment", {
                    layout: "default-layout",
                    title: "Payment - Luka Store",
                    checkoutInfo,
                    formattedAddress,
                    shippingMethod: Object.assign({ id: shippingMethodId }, shippingMethod),
                    cart,
                    total,
                    subtotal,
                    shippingCost,
                });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    static processPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const session = req.session;
                const user = session.user;
                if (!user || !user.id) {
                    return res.status(401).redirect("/auth/login");
                }
                // Load cart from database
                const cart = yield cartService.getCart(user.id);
                const checkoutInfo = session.checkoutInfo;
                const shippingMethodId = session.shippingMethod;
                if (!cart || cart.length === 0) {
                    return res.redirect("/cart");
                }
                if (!checkoutInfo) {
                    return res.redirect("/checkout/information");
                }
                if (!shippingMethodId) {
                    return res.redirect("/checkout/shipping");
                }
                const { cardholderName, cardNumber, expirationMonth, expirationYear, securityCode, } = req.body;
                // Validate payment fields (basic validation)
                if (!cardholderName || !cardNumber || !expirationMonth || !expirationYear || !securityCode) {
                    return res.status(400).send("Missing payment information");
                }
                // Calculate totals
                const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * (item.qty || item.quantity || 0), 0);
                const shippingCost = ((_a = SHIPPING_METHODS[shippingMethodId]) === null || _a === void 0 ? void 0 : _a.price) || 0;
                // Format shipping address
                const shippingAddress = `${checkoutInfo.firstName} ${checkoutInfo.lastName}\n${checkoutInfo.address1}${checkoutInfo.address2 ? ", " + checkoutInfo.address2 : ""}\n${checkoutInfo.city}, ${checkoutInfo.state} ${checkoutInfo.zip}\n${checkoutInfo.country}\n${checkoutInfo.phone ? `Phone: ${checkoutInfo.phone}` : ""}`;
                // Create order
                const order = yield orderService.createOrder({
                    userId: user.id,
                    cart,
                    shippingAddress,
                    shippingCost,
                });
                // Clear cart from database after successful order
                yield cartService.clearCart(user.id);
                // Store order ID in session for success page
                session.orderId = order.id;
                // Clear checkout data from session
                delete session.checkoutInfo;
                delete session.shippingMethod;
                // Save session and redirect to success
                session.save((err) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.redirect(`/checkout/success?orderId=${order.id}`);
                });
            }
            catch (error) {
                console.error("Error processing payment:", error);
                res.status(500).send(error.message);
            }
        });
    }
    static success(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = req.session;
                const orderId = req.query.orderId || session.orderId;
                if (!orderId) {
                    return res.redirect("/");
                }
                // Get order details
                const order = yield orderService.getOrderById(Number(orderId));
                if (!order) {
                    return res.status(404).send("Order not found");
                }
                // Clear order ID from session
                delete session.orderId;
                res.render("areas/client/checkout/success", {
                    layout: "default-layout",
                    title: "Order Success - Luka Store",
                    order,
                });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
}
exports.CheckoutController = CheckoutController;
//# sourceMappingURL=checkout.controller.js.map