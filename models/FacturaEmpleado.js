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
      type: Number,
      validate: {
        validator: function(v) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Validar formato de hora HH:mm
        },
        message: props => `${props.value} no es un formato de hora válido. Use el formato HH:mm.`,
      },
      trim: true,
    },
    horaSalida: {
      type: Number,
      validate: {
        validator: function(v) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Validar formato de hora HH:mm
        },
        message: props => `${props.value} no es un formato de hora válido. Use el formato HH:mm.`,
      },
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