import { Router } from "express";
import { getClientes, createCliente, updateCliente, removeCliente, getCliente } from "../controllers/clientes.controllers.js";

const clientesRouter = Router();

// Ruta para obtener todos los clientes
clientesRouter.get("/clientes", getClientes);

// Ruta para obtener un cliente específico por su ID
clientesRouter.get("/clientes/:id", getCliente);

// Ruta para crear un nuevo cliente
clientesRouter.post("/clientes", createCliente);

// Ruta para actualizar un cliente existente por su ID
clientesRouter.put("/clientes/:id", updateCliente);

// Ruta para eliminar un cliente por su ID
clientesRouter.delete("/clientes/:id", removeCliente);

export default clientesRouter;