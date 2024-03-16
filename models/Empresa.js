import mongoose from "mongoose";

const empresaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
    },
    identificador: {
      type: Number,
      unique: true,
      default: 1, // Este valor se irá autoincrementando
    },
    empleados: [{
      nombre: {
        type: String,
        trim: true,
      },
      cedula: {
        type: String,
        trim: true,
        unique: true,
      },
      direccion: {
        type: String,
        trim: true,
      },
      celular: {
        type: String,
        trim: true,
      },
      usuario: {
        type: String,
        trim: true,
        unique: true,
      },
      contraseña: {
        type: String,
        trim: true,
      },
      cargo: {
        type: String,
        enum: ['administrador', 'empleado'],
        required: true,
      },
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Empresa", empresaSchema);