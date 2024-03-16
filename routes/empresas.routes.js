import { Router } from "express";
import {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario ,
    removeUsuario 
} from "../controllers/empresa.controllers.js"

const empresaRouter = Router();

empresaRouter.get("/empleados", getUsuarios);

empresaRouter.get("/empleados/:id", getUsuario);

empresaRouter.post("/empleados", createUsuario);

empresaRouter.put("/empleados/:id", updateUsuario);

empresaRouter.delete("/empleados/:id", removeUsuario);

export default empresaRouter;