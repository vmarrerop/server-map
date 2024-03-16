import Empresa from '../models/Usuarios.js'

export const getUsuarios = async (req, res) => {
  try {
    const empresas = await Empresa.find({});
    return res.json(empresas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { nombre, empleados } = req.body;
    
    // Comprobamos si ya existe un empleado con el mismo usuario
    const existingUsuario = await Empresa.findOne({ 'empleados.usuario': empleados.usuario });
    if (existingUsuario) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Comprobamos si ya existe un empleado con la misma cédula
    const existingCedula = await Empresa.findOne({ 'empleados.cedula': empleados.cedula });
    if (existingCedula) {
      return res.status(400).json({ message: "La cédula ya existe" });
    }

    const newEmpresa = new Empresa({ nombre, empleados });
    await newEmpresa.save();
    return res.json(newEmpresa);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findById(id);
    if (!empresa) return res.sendStatus(404);
    return res.json(empresa);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEmpleadoByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const empresa = await Empresa.findOne({ 'empleados.usuario': username });
    if (!empresa) return res.sendStatus(404);
    const empleado = empresa.empleados.find(emp => emp.usuario === username);
    return res.json(empleado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmpresa = await Empresa.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    return res.json(updatedEmpresa);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findByIdAndDelete(id);
    if (!empresa) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
