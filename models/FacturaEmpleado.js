import mongoose from "mongoose";

const facturaEmpleadoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
    },
    dia: {
      type: String,
      trim: true,
    },
    horaEntrada: {
      type: Number, // Cambiado de Date a Number para almacenar la hora como milisegundos desde la medianoche
      trim: true,
    },
    horaSalida: {
      type: Number, // Cambiado de Date a Number para almacenar la hora como milisegundos desde la medianoche
      trim: true,
    },
    tipoDia: {
      type: String,
      enum: ['Ordinario', 'Dominical', 'Festivo', 'Falta'], // Agregar más tipos si es necesario
      trim: true,
    },
    horasTotales: {
      type: Number,
      trim: true,
    },
    totalGanado: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("FacturaEmpleado", facturaEmpleadoSchema);