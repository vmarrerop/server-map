import { Router } from "express";
import {
  getFactura,
  createFactura,
  updateFactura,
  removeFactura,
  getFacturas,
} from "../controllers/factura.controllers.js";

const facturasRouter = Router();

facturasRouter.get("/facturas", getFacturas);

facturasRouter.get("/facturas/:id", getFactura);

facturasRouter.post("/facturas", createFactura);

facturasRouter.put("/facturas/:id", updateFactura);

facturasRouter.delete("/facturas/:id", removeFactura);

export default facturasRouter;
