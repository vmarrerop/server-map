import { Router } from "express";
import {
  createFactura,
  updateFactura,
  removeFactura,
  getFacturas,
} from "../controllers/cocina.controllers.js";

const cocinaRouter = Router();

cocinaRouter.get("/cocinas", getFacturas);


cocinaRouter.post("/cocinas", createFactura);

cocinaRouter.put("/cocinas/:id", updateFactura);

cocinaRouter.delete("/cocinas/:id", removeFactura);

export default cocinaRouter;