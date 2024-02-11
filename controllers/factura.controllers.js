import Factura from "../models/Factura.js"; // Asegúrate de importar el modelo de Factura

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
    const { cliente, sede, productos, cantidadTotal, dineroRecibido, dineroDevuelto, gananciaTotal } = req.body;
    const newFactura = new Factura({ cliente, sede, productos, cantidadTotal, dineroRecibido, dineroDevuelto, gananciaTotal });
    await newFactura.save();
    return res.json(newFactura);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await Factura.findById(id);
    if (!factura) return res.sendStatus(404);
    return res.json(factura);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFactura = await Factura.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    return res.json(updatedFactura);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await Factura.findByIdAndDelete(id);
    if (!factura) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};