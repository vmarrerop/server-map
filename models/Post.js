import mongoose from "mongoose";

// Esquema de insumo para reutilización
const insumoSchema = new mongoose.Schema({
  nombreInsumo: {
    type: String,
    trim: true,
  },
  cantidadInsumo: {
    type: Number,
    trim: true,
  }
});

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
    cantidadPorcion: {
      type: Number,
      //required: true,
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
    sede: {
      type: String,
      trim: true,
    },
    image: {
      public_id: String,
      url: String,
    },
    insumos: [insumoSchema], // Agrega un arreglo de insumos
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Post", postSchema);