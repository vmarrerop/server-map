import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema(
    {
      nombre: {
          type: String,
          trim: true,
      },
      sede: {
          type: String,
          trim: true,
      },
      identificacion: {
        type: Number,
        trim: true,
      },
      precioHora: {
        type: Number,
        trim: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export default mongoose.model("Empleado", empleadoSchema);