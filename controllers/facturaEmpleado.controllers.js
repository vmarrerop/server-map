import FacturaEmpleado from "../models/FacturaEmpleado.js"; // Asegúrate de importar el modelo de FacturaEmpleado

export const getFacturasEmpleado = async (req, res) => {
  try {
    const facturasEmpleado = await FacturaEmpleado.find({});
    return res.json(facturasEmpleado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createFacturaEmpleado = async (req, res) => {
  try {
    const { nombre, dia, horaEntrada, horaSalida, tipoDia, horasTotales, totalGanado } = req.body;
    const newFacturaEmpleado = new FacturaEmpleado({ nombre, dia, horaEntrada, horaSalida, tipoDia, horasTotales, totalGanado });
    await newFacturaEmpleado.save();
    return res.json(newFacturaEmpleado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFacturaEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const facturaEmpleado = await FacturaEmpleado.findById(id);
    if (!facturaEmpleado) return res.sendStatus(404);
    return res.json(facturaEmpleado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateFacturaEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFacturaEmpleado = await FacturaEmpleado.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    return res.json(updatedFacturaEmpleado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeFacturaEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const facturaEmpleado = await FacturaEmpleado.findByIdAndDelete(id);
    if (!facturaEmpleado) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};