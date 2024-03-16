import Empresa from "../models/Empresa.js";

export const getUsuarios = async (req, res) => {
  try {
    const empresa = await Empresa.find({});
    return res.json(empresa.empleados);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { nombre, cedula, direccion, celular, usuario, contraseña, cargo } = req.body;
    const empresa = await Empresa.findOneAndUpdate({}, { $push: { empleados: { nombre, cedula, direccion, celular, usuario, contraseña, cargo } } }, { new: true });
    return res.json(empresa);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findOne({});
    const empleado = empresa.empleados.find((emp) => emp._id.toString() === id);
    if (!empleado) return res.sendStatus(404);
    return res.json(empleado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findOne({});
    const index = empresa.empleados.findIndex((emp) => emp._id.toString() === id);
    if (index === -1) return res.sendStatus(404);
    empresa.empleados[index] = { ...empresa.empleados[index], ...req.body };
    await empresa.save();
    return res.json(empresa.empleados[index]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findOneAndUpdate({}, { $pull: { empleados: { _id: id } } }, { new: true });
    if (!empresa) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};