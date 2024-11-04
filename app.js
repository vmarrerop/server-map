import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from "./routes/posts.routes.js";
import { connectDB } from "./db.js";
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 3001;

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

let connections = [];
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