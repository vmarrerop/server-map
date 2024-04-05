import Cliente from "../models/Cliente.js";

// Obtener todos los clientes
export const getClientes = async (req, res) => {
    try {
      const clientes = await Cliente.find({});
      return res.json(clientes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  // Crear nuevos clientes
export const createCliente = async (req, res) => {
    try {
      const clientes = req.body; // Obtener el array de clientes del cuerpo de la solicitud
      const nuevosClientes = await Cliente.insertMany(clientes); // Insertar todos los clientes en la base de datos
      return res.json(nuevosClientes); // Devolver los clientes recién creados como respuesta
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  
  // Obtener un cliente por su ID
  export const getCliente = async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findById(id);
      if (!cliente) return res.sendStatus(404);
      return res.json(cliente);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  // Actualizar un cliente por su ID
  export const updateCliente = async (req, res) => {
    try {
      const { id } = req.params;
      const clienteActualizado = await Cliente.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      return res.json(clienteActualizado);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  // Eliminar un cliente por su ID
  export const removeCliente = async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByIdAndDelete(id);
      if (!cliente) return res.sendStatus(404);
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };  