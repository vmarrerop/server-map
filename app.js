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


app.get("/", (req, res) => {
  res.send("Hola gente");
})

connectDB();
app.listen(PORT, () => {
    console.log("Server on port", PORT);
});

export { app };