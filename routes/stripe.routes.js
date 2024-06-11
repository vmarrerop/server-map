import { Router } from 'express';
import { getPrices, createCheckoutSession  } from '../controllers/stripe.controllers.js';

const stripeRouter = Router();

// Ruta para obtener los precios
stripeRouter.get('/prices', getPrices);

// Ruta para crear la sesión de checkout
stripeRouter.post('/checkout-session', createCheckoutSession);

export default stripeRouter;