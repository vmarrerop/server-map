import { Router } from 'express';
import { getPrices, createCheckoutSession, handleWebhook   } from '../controllers/stripe.controllers.js';

const stripeRouter = Router();

// Ruta para obtener los precios
stripeRouter.get('/prices', getPrices);

// Ruta para crear la sesión de checkout
stripeRouter.post('/checkout-session', createCheckoutSession);

// Ruta para manejar el webhook de Stripe
stripeRouter.post('/webhook', handleWebhook);


export default stripeRouter;