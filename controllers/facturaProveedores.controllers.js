import FacturaProveedores from "../models/FacturaProveedores.js"; // Asegúrate de importar el modelo de FacturaProveedores

export const getFacturasProveedores = async (req, res) => {
  try {
    const facturasProveedores = await FacturaProveedores.find({});
    return res.json(facturasProveedores);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createFacturaProveedor = async (req, res) => {
  try {
    const { nombreProveedor, sede, productos, cantidadTotal, totalFactura, descuentoTotal } = req.body;
    const newFacturaProveedor = new FacturaProveedores({ nombreProveedor, sede, productos, cantidadTotal, totalFactura, descuentoTotal });
    await newFacturaProveedor.save();
    return res.json(newFacturaProveedor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFacturaProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const facturaProveedor = await FacturaProveedores.findById(id);
    if (!facturaProveedor) return res.sendStatus(404);
    return res.json(facturaProveedor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateFacturaProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFacturaProveedor = await FacturaProveedores.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    return res.json(updatedFacturaProveedor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeFacturaProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const facturaProveedor = await FacturaProveedores.findByIdAndDelete(id);
    if (!facturaProveedor) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};