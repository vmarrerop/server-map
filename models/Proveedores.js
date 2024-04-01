import mongoose from "mongoose";

const proveedoresSchema = new mongoose.Schema(
    {
      nombre: {
          type: String,
          trim: true,
      },
      sede: {
        type: String,
        trim: true,
    }
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export default mongoose.model("Proveedores", proveedoresSchema);