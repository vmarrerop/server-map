import Factura from "../models/Cocina.js"; // Asegúrate de importar el modelo de Factura
import { sendEventToAll } from "../app.js";

export const getFacturas = async (req, res) => {
    try {
      const facturas = await Factura.find({});
      return res.json(facturas);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const createFactura = async (req, res) => {
    try {
      const { cliente, vendedor, sede, productos, observacion, estado, mesa, domicilio } = req.body;
      const newFactura = new Factura({ cliente, vendedor, sede, productos, observacion, estado, mesa, domicilio });
      await newFactura.save();
  
      // Enviar actualización a todos los clientes
      const updatedData = await Factura.find({});
      sendEventToAll(updatedData);
  
      return res.json(newFactura);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const updateFactura = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFactura = await Factura.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      if (updatedFactura) {
        const updatedData = await Factura.find({});
        sendEventToAll(updatedData);
      }
      return res.json(updatedFactura);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const removeFactura = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedFactura = await Factura.findByIdAndDelete(id);
      if (!deletedFactura) return res.sendStatus(404);
  
      // Enviar actualización a todos los clientes
      const updatedData = await Factura.find({});
      sendEventToAll(updatedData);
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };