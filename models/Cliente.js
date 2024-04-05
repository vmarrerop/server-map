import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema(
    {
      nombre: {
          type: String,
          trim: true,
      },
      sede: {
        type: String,
        trim: true,
    },
    deuda: {
        type: Number,
        trim: true,
    }
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export default mongoose.model("Cliente", clienteSchema);