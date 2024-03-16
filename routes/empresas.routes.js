import { Router } from "express";
import {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    removeUsuario,
    getEmpleadoByUsername 
} from "../controllers/empresa.controllers.js";

const empresaRouter = Router();

// Rutas para obtener usuarios
empresaRouter.get("/empleados", getUsuarios); // Obtener todos los usuarios
empresaRouter.get("/empleados/id/:id", getUsuario); // Obtener usuario por ID
empresaRouter.get("/empleados/username/:username", getEmpleadoByUsername); // Obtener usuario por nombre de usuario

// Rutas para crear, actualizar y eliminar usuarios
empresaRouter.post("/empleados", createUsuario); // Crear un nuevo usuario
empresaRouter.put("/empleados/:id", updateUsuario); // Actualizar un usuario existente por su ID
empresaRouter.delete("/empleados/:id", removeUsuario); // Eliminar un usuario existente por su ID

export default empresaRouter;