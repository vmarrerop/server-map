import Stripe from 'stripe';
import Usuario from '../models/Usuarios.js';
import mongoose from 'mongoose';

// Inicializar la instancia de Stripe con la clave secreta
const stripe = new Stripe('pk_live_51PNfGu2MNK4GBjOUk9JyWqePhXKj49jaeajTGOPy8SN2l6Ify87S4m96SQ9N6AFgmc4tTvtiojBuF7mjkkJMND6m00h4dBXMHC');

export const getPrices = async (req, res) => {
  try {
    const prices = await stripe.prices.list();
    return res.json({
      message: "Hello from /api/prices",
      prices: prices.data.map(price => ({
        id: price.id,
        unit_amount: price.unit_amount,
        nickname: price.nickname,
        description: price.product.name, // Ajusta según la estructura de tu producto en Stripe
      })),
    });
  } catch (error) {
    console.error('Error fetching prices from Stripe:', error);
    return res.status(500).json({ message: error.message });
  }
};


export const createCheckoutSession = async (req, res) => {
  try {
    const { priceId } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `https://asqwd.xyz/success`,
      cancel_url: 'https://asqwd.xyz/',
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_W4SB1yDfgqqamrkhEKLoFEtueOY7hD41');
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = new URL(session.success_url).searchParams.get('userId');

    if (userId) {
      try {
        const empresa = new Usuario({
          empresaId: new mongoose.Types.ObjectId(),
          nombre: `Empresa de ${userId}`,
          sedes: [],
          empleados: [],
        });
        await empresa.save();
        console.log(`Empresa creada para el usuario ${userId}`);
      } catch (error) {
        console.error('Error creating company:', error);
      }
    }
  }

  res.json({ received: true });
};