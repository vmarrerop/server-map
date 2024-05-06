import mongoose from "mongoose";

const cocinaSchema = new mongoose.Schema(
    {
      cliente: {
          type: String,
          trim: true,
      },
      vendedor: {
        type: String,
        trim: true,
    },
      sede: {
          type: String,
          trim: true,
      },
      estado: {
        type: String,
        trim: true,
    },
      productos: [{
        nombre: {
          type: String,
          trim: true,
        },
        nombreProteina: {
          type: String,
          trim: true,
        },
        categoria: {
          type: String,
          trim: true,
        },
        cantidad: {
          type: Number,
          trim: true,
        },
        precio: {
          type: Number,
          trim: true,
        },
        total: {
          type: Number,
          trim: true
        },
      }],
      observacion: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export default mongoose.model("Cocina", cocinaSchema);