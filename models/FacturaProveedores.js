import mongoose from "mongoose";

const facturaProveedoresSchema = new mongoose.Schema(
    {
      nombreProveedor: {
          type: String,
          trim: true,
      },
      sede: {
          type: String,
          trim: true,
      },
      vendedor: {
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
        descuento: {
          type: Number,
          trim: true,
        },
        subtotal: {
            type: Number,
            trim: true
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
      totalFactura: {
        type: Number,
        trim: true,
      },
      descuentoTotal: {
        type: Number,
        trim: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export default mongoose.model("FacturaProveedores", facturaProveedoresSchema);