import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from "./routes/posts.routes.js";
import facturasRoutes from './routes/facturas.routes.js';
import proveedoresRouter from "./routes/proveedores.routes.js";
import empresaRouter from "./routes/usuarios.routes.js";
import facturasProveedoresRouter from "./routes/facturasProveedores.routes.js";
import facturasEmpleadoRouter from "./routes/facturaEmpleado.routes.js";
import clientesRouter from "./routes/clientes.routes.js";
import cocinaRouter from "./routes/cocina.routes.js";
import { connectDB } from "./db.js";
import cors from 'cors';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://jVicente:12345@cluster0.u8fdjxz.mongodb.net/?retryWrites=true&w=majority";
export const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// SSE Route
let connections = []; // This will store all active connections

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Add this connection to the list of active connections
    connections.push(res);

    const sendEvent = (data) => {
        connections.forEach(conn => conn.write(`data: ${JSON.stringify(data)}\n\n`));
    };

    // Send initial data or a connection confirmation message
    sendEvent({ message: "Connected to SSE", timestamp: new Date() });

    req.on('close', () => {
        // Remove this response from connections array when connection closes
        connections = connections.filter(conn => conn !== res);
        res.end();
    });
});

// Example of using sendEvent in your data manipulation routes
app.post('/api/cocinas', async (req, res) => {
    // handle the creation of cocina
    // on success:
    const newData = await fetchAllCocinaData(); // Assuming this fetches updated data
    connections.forEach(conn => conn.write(`data: ${JSON.stringify(newData)}\n\n`)); // broadcast updated data
    res.status(201).json(newData);
});

app.get("/", (req, res) => {
  res.send("Hola gente");
})

connectDB();
app.listen(PORT, () => {
    console.log("Server on port", PORT);
});

export { app };