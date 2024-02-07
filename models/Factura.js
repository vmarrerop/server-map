import mongoose from "mongoose";

const facturaSchema = new mongoose.Schema(
    {
      cliente: {
          type: String,
          required: true,
          trim: true,
      },
      sede: {
          type: String,
          required: true,
          trim: true,
      },
      productos: [{
        nombre: {
          type: String,
          required: true,
          trim: true,
        },
        cantidad: {
          type: Number,
          required: true,
          trim: true,
        },
        precio: {
          type: Number,
          required: true,
          trim: true,
        },
        // Otros campos relacionados con el producto, como descripción, categoría, etc.
      }],
      total: {
        type: Number,
        required: true,
        trim: true,
      },
      dineroRecibido: {
        type: Number,
        required: true,
        trim: true,
      },
      dineroDevuelto: {
        type: Number,
        required: true,
        trim: true,
      },
      gananciaTotal: {
        type: Number,
        trim: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export default mongoose.model("Factura", facturaSchema);