import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    proveedor: {
      type: String,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      trim: true,
    },
    precioCompra: {
      type: Number,
      required: true,
      trim: true,
    },
    unidad: {
      type: String,
      required: true,
      trim: true,
    },
    cantidad: {
      type: Number,
      required: true,
      trim: true,
    },
    categoria: { 
      type: String,
      trim: true,
    },
    insumo: [
      {
        nombreInsumo: {
          type: String,
          required: true,
        },
        cantidadInsumo: {
          type: Number,
          default: 1, // Valor predeterminado si no se proporciona cantidad
        },
      },
    ],
    sede: {
      type: String,
      trim: true,
    },
    image: {
      public_id: String,
      url: String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Post", postSchema);