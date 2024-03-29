import { Router } from "express";
import {
  getFacturasEmpleado,
  createFacturaEmpleado,
  updateFacturaEmpleado,
  removeFacturaEmpleado,
  getFacturaEmpleado,
} from "../controllers/facturaEmpleado.controllers.js";

const facturasEmpleadoRouter = Router();

facturasEmpleadoRouter.get("/facturas-empleado", getFacturasEmpleado);

facturasEmpleadoRouter.get("/facturas-empleado/:id", getFacturaEmpleado);

facturasEmpleadoRouter.post("/facturas-empleado", createFacturaEmpleado);

facturasEmpleadoRouter.put("/facturas-empleado/:id", updateFacturaEmpleado);

facturasEmpleadoRouter.delete("/facturas-empleado/:id", removeFacturaEmpleado);

export default facturasEmpleadoRouter;