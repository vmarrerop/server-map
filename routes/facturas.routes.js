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

router.get("/posts", getFacturas);

router.get("/posts/:id", getFactura);

router.post("/posts", createFactura);

router.put("/posts/:id", updateFactura);

router.delete("/posts/:id", removeFactura);

export default router;