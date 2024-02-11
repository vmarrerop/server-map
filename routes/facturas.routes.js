import { Router } from "express";
import {
    getFactura,
    createFactura,
    updateFactura,
    removeFactura,
    getFactura,
    getFacturas,
  } from "../controllers/factura.controllers.js";

const router = Router();

router.get("/facturas", getFacturas);

router.get("/facturas/:id", getFactura);

router.post("/facturas", createFactura);

router.put("/facturas/:id", updateFactura);

router.delete("/facturas/:id", removeFactura);

export default router;