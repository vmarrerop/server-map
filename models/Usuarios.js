import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
    },
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
      }
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Usuarios", usuarioSchema);