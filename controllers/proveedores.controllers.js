import Proveedor from "../models/Proveedor.js"; // Asegúrate de importar el modelo de Proveedor

export const getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find({});
    return res.json(proveedores);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProveedor = async (req, res) => {
  try {
    const { nombre, productos, cantidadTotal } = req.body;
    const nuevoProveedor = new Proveedor({ nombre, productos, cantidadTotal });
    await nuevoProveedor.save();
    return res.json(nuevoProveedor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedor.findById(id);
    if (!proveedor) return res.sendStatus(404);
    return res.json(proveedor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedorActualizado = await Proveedor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    return res.json(proveedorActualizado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedor.findByIdAndDelete(id);
    if (!proveedor) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};