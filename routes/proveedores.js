import { Router } from "express";
import {
  getProveedores,
  createProveedor,
  updateProveedor,
  removeProveedor,
  getProveedor,
} from "../controllers/proveedor.controllers.js";

const proveedoresRouter = Router();

proveedoresRouter.get("/proveedores", getProveedores);

proveedoresRouter.get("/proveedores/:id", getProveedor);

proveedoresRouter.post("/proveedores", createProveedor);

proveedoresRouter.put("/proveedores/:id", updateProveedor);

proveedoresRouter.delete("/proveedores/:id", removeProveedor);

export default proveedoresRouter;