import { Request, Response } from "express";
import { OrderService } from "../../application/order.service";
import { AuthRepository } from "../../infrastructure/repositories/auth.repository";
import { CartService } from "../../application/cart.service";

const orderService = new OrderService();
const authRepository = new AuthRepository();
const cartService = new CartService();

// Shipping methods mapping
const SHIPPING_METHODS: { [key: string]: { name: string; price: number } } = {
    "001": { name: "Ground", price: 9.99 },
    "002": { name: "2-Day Express", price: 15.99 },
    "003": { name: "Overnight", price: 21.99 },
    "005": { name: "Store Pickup", price: 0.0 },
};

export class CheckoutController {
    static async information(req: Request, res: Response) {
        try {
            const session = req.session as any;
            const user = session.user; // User is guaranteed to exist due to authentication middleware
            
            if (!user) {
                return res.redirect("/auth/login");
            }

            // Load cart from database
            const cart = await cartService.getCart(user.id);

            if (!cart || cart.length === 0) {
                return res.redirect("/cart");
            }

            // Get user details from database to pre-fill form
            const userDetails = await authRepository.getById(user.id);
            
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
            const subtotal = cart.reduce((sum: number, item: any) => sum + parseFloat(item.price) * (item.qty || item.quantity || 0), 0);

            res.render("areas/client/checkout/information", {
                layout: "default-layout",
                title: "Checkout - Luka Store",
                cart,
                total: subtotal,
                checkoutInfo: checkoutInfo || null,
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    static async processInformation(req: Request, res: Response) {
        try {
            const session = req.session as any;
            const user = session.user;
            
            if (!user || !user.id) {
                return res.redirect("/auth/login");
            }

            // Load cart from database
            const cart = await cartService.getCart(user.id);

            if (!cart || cart.length === 0) {
                return res.redirect("/cart");
            }

            const {
                email,
                firstName,
                lastName,
                address1,
                address2,
                city,
                state,
                zip,
                country,
                phone,
            } = req.body;

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
            session.save((err: any) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.redirect("/checkout/shipping");
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    static async shipping(req: Request, res: Response) {
        try {
            const session = req.session as any;
            const user = session.user;
            
            if (!user || !user.id) {
                return res.redirect("/auth/login");
            }

            // Load cart from database
            const cart = await cartService.getCart(user.id);
            const checkoutInfo = session.checkoutInfo;

            if (!cart || cart.length === 0) {
                return res.redirect("/cart");
            }

            if (!checkoutInfo) {
                return res.redirect("/checkout/information");
            }

            const subtotal = cart.reduce((sum: number, item: any) => sum + parseFloat(item.price) * (item.qty || item.quantity || 0), 0);
            const shippingCost = session.shippingMethod 
                ? SHIPPING_METHODS[session.shippingMethod]?.price || 0 
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
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    static async processShipping(req: Request, res: Response) {
        try {
            const session = req.session as any;
            const user = session.user;
            
            if (!user || !user.id) {
                return res.redirect("/auth/login");
            }

            // Load cart from database
            const cart = await cartService.getCart(user.id);
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
            session.save((err: any) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.redirect("/checkout/payment");
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    static async payment(req: Request, res: Response) {
        try {
            const session = req.session as any;
            const user = session.user;
            
            if (!user || !user.id) {
                return res.redirect("/auth/login");
            }

            // Load cart from database
            const cart = await cartService.getCart(user.id);
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

            const subtotal = cart.reduce((sum: number, item: any) => sum + parseFloat(item.price) * (item.qty || item.quantity || 0), 0);
            const shippingCost = SHIPPING_METHODS[shippingMethodId]?.price || 0;
            const total = subtotal + shippingCost;

            // Format address for display
            const formattedAddress = `${checkoutInfo.address1}${checkoutInfo.address2 ? ", " + checkoutInfo.address2 : ""}, ${checkoutInfo.city}, ${checkoutInfo.state} ${checkoutInfo.zip}, ${checkoutInfo.country}`;
            const shippingMethod = SHIPPING_METHODS[shippingMethodId];

            res.render("areas/client/checkout/payment", {
                layout: "default-layout",
                title: "Payment - Luka Store",
                checkoutInfo,
                formattedAddress,
                shippingMethod: {
                    id: shippingMethodId,
                    ...shippingMethod,
                },
                cart,
                total,
                subtotal,
                shippingCost,
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    static async processPayment(req: Request, res: Response) {
        try {
            const session = req.session as any;
            const user = session.user;
            
            if (!user || !user.id) {
                return res.status(401).redirect("/auth/login");
            }

            // Load cart from database
            const cart = await cartService.getCart(user.id);
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

            const {
                cardholderName,
                cardNumber,
                expirationMonth,
                expirationYear,
                securityCode,
            } = req.body;

            // Validate payment fields (basic validation)
            if (!cardholderName || !cardNumber || !expirationMonth || !expirationYear || !securityCode) {
                return res.status(400).send("Missing payment information");
            }

            // Calculate totals
            const subtotal = cart.reduce((sum: number, item: any) => sum + parseFloat(item.price) * (item.qty || item.quantity || 0), 0);
            const shippingCost = SHIPPING_METHODS[shippingMethodId]?.price || 0;

            // Format shipping address
            const shippingAddress = `${checkoutInfo.firstName} ${checkoutInfo.lastName}\n${checkoutInfo.address1}${checkoutInfo.address2 ? ", " + checkoutInfo.address2 : ""}\n${checkoutInfo.city}, ${checkoutInfo.state} ${checkoutInfo.zip}\n${checkoutInfo.country}\n${checkoutInfo.phone ? `Phone: ${checkoutInfo.phone}` : ""}`;

            // Create order
            const order = await orderService.createOrder({
                userId: user.id,
                cart,
                shippingAddress,
                shippingCost,
            });

            // Clear cart from database after successful order
            await cartService.clearCart(user.id);

            // Store order ID in session for success page
            session.orderId = order.id;

            // Clear checkout data from session
            delete session.checkoutInfo;
            delete session.shippingMethod;

            // Save session and redirect to success
            session.save((err: any) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.redirect(`/checkout/success?orderId=${order.id}`);
            });
        } catch (error: any) {
            console.error("Error processing payment:", error);
            res.status(500).send(error.message);
        }
    }

    static async success(req: Request, res: Response) {
        try {
            const session = req.session as any;
            const orderId = req.query.orderId || session.orderId;

            if (!orderId) {
                return res.redirect("/");
            }

            // Get order details
            const order = await orderService.getOrderById(Number(orderId));

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
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
}