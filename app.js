import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import postRoutes from "./routes/posts.routes.js";
import { connectDB } from "./db.js";
import cors from 'cors';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://jVicente:12345@cluster0.u8fdjxz.mongodb.net/?retryWrites=true&w=majority";
export const PORT = process.env.PORT || 3000

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
app.use("/api", postRoutes);

app.get("/", (req, res) => {
  res.send("Hola gente");
})

connectDB();
app.listen(PORT);
console.log("Server on port", PORT);

export { app };