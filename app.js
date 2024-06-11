import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import router from "./routes/posts.routes.js";
import facturasRoutes from './routes/facturas.routes.js';
import proveedoresRouter from "./routes/proveedores.routes.js";
import empresaRouter from "./routes/usuarios.routes.js";
import facturasProveedoresRouter from "./routes/facturasProveedores.routes.js";
import facturasEmpleadoRouter from "./routes/facturaEmpleado.routes.js";
import clientesRouter from "./routes/clientes.routes.js";
import cocinaRouter from "./routes/cocina.routes.js";
import stripeRouter from "./routes/stripe.routes.js";
import { connectDB } from "./db.js";
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://jVicente:12345@cluster0.u8fdjxz.mongodb.net/?retryWrites=true&w=majority";
export const PORT = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ruta para manejar el webhook de Stripe
import { handleWebhook } from './controllers/stripe.controllers.js';
app.post('/api/stripe/webhook', handleWebhook);

app.use(
  fileUpload({
    tempFileDir: "./upload",
    useTempFiles: true,
  })
);

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors());

// Routes
app.use("/api", router);
app.use("/api", facturasRoutes);
app.use("/api", proveedoresRouter);
app.use("/api", empresaRouter);
app.use("/api", facturasProveedoresRouter);
app.use("/api", facturasEmpleadoRouter);
app.use("/api", clientesRouter);
app.use("/api", cocinaRouter);
app.use("/api", stripeRouter);

// SSE Route: Mantenimiento de conexiones SSE
let connections = []; // Almacena todas las conexiones activas
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    connections.push(res);

    req.on('close', () => {
        connections = connections.filter(conn => conn !== res);
        res.end();
    });
});

// Función para enviar eventos a todas las conexiones activas
export const sendEventToAll = (data) => {
    connections.forEach(conn => conn.write(`data: ${JSON.stringify(data)}\n\n`));
};

const oAuth2Client = new google.auth.OAuth2(
  '337713739163-7gnjvt6ghlpb94f9f84fdgnli0tivlt7.apps.googleusercontent.com',
  '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',
  'https://developers.google.com/oauthplayground'
);

oAuth2Client.setCredentials({
  refresh_token: '1//04m-5mvDxG5tHCgYIARAAGAQSNwF-L9IrSJVa3mmUzP-o1XgMEv6RPi9wx8YRmAaiJ4Ajm1_tsWC1kONFq7qmetz8Qvmg7dKRnpo'
});

app.post('/api/enviar-factura', async (req, res) => {
  const { email, pdf } = req.body;

  if (!email || !pdf) {
    return res.status(400).send('Correo y PDF son requeridos.');
  }

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'jovimapo.21@gmail.com',
        clientId: '337713739163-7gnjvt6ghlpb94f9f84fdgnli0tivlt7.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04m-5mvDxG5tHCgYIARAAGAQSNwF-L9IrSJVa3mmUzP-o1XgMEv6RPi9wx8YRmAaiJ4Ajm1_tsWC1kONFq7qmetz8Qvmg7dKRnpo',
        accessToken: accessToken.token
      }
    });

    let mailOptions = {
      from: 'jovimapo.21@gmail.com',
      to: email,
      subject: 'Factura',
      text: 'Adjunto encontrará su factura.',
      attachments: [
        {
          filename: 'factura.pdf',
          content: pdf,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
      ]
    };

    console.log('Enviando correo a:', email);
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito');
    res.status(200).send('Factura enviada!');
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).send(error.toString());
  }
});

app.get("/", (req, res) => {
  res.send("Hola gente");
})

connectDB();
app.listen(PORT, () => {
  console.log("Server on port", PORT);
});

export { app };