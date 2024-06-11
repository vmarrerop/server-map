import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const usuarioSchema = new mongoose.Schema(
  {
    empresaId: {
      type: String,
      unique: true,
      default: uuidv4, // Usar uuidv4 para generar un identificador único
      required: true,
    },

    nombre: {
      type: String,
      trim: true,
    },

    sedes: [
      {
        nombre: {
          type: String,
          trim: true,
        },
        base: {
          type: Number,
          trim: true,
          //unique: true,
        },
      }
    ],
    
    empleados: [
      {
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
          trim: true,
        },
        sede: {
          type: String,
          trim: true,
        },
        horaOrdinaria: {
          type: Number,
          trim: true,
        },
        horaDominical: {
          type: Number,
          trim: true,
        },
        horaFestivo: {
          type: Number,
          trim: true,
        },
      }
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Usuarios", usuarioSchema);