import { Router } from "express";
import {
  getFactura,
  createFactura,
  updateFactura,
  removeFactura,
  getFacturas,
} from "../controllers/cocina.controllers.js";

const cocinaRouter = Router();

cocinaRouter.get("/facturas", getFacturas);

cocinaRouter.get("/facturas/:id", getFactura);

cocinaRouter.post("/facturas", createFactura);

cocinaRouter.put("/facturas/:id", updateFactura);

cocinaRouter.delete("/facturas/:id", removeFactura);

export default cocinaRouter;