import mongoose from "mongoose";

const facturaSchema = new mongoose.Schema(
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
      productos: [{
        nombre: {
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
      cantidadTotal: {
        type: Number,
        trim: true,
      },
      metodoPago: {
        type: String,
        trim: true,
      },
      observacion: {
        type: String,
        trim: true,
      },
      dineroRecibido: {
        type: Number,
        trim: true,
      },
      dineroDevuelto: {
        type: Number,
        trim: true,
      },
      totalFactura: {
        type: Number,
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