import express from 'express';
import {
  getFacturasProveedores,
  createFacturaProveedor,
  getFacturaProveedor,
  updateFacturaProveedor,
  removeFacturaProveedor
} from '../controllers/facturaProveedores.controllers.js'; // Asegúrate de importar los controladores adecuados

const facturasProveedoresRouter = express.Router();

// Rutas para las facturas de proveedores
facturasProveedoresRouter.get('/facturas-proveedores', getFacturasProveedores);
facturasProveedoresRouter.post('/facturas-proveedores', createFacturaProveedor);
facturasProveedoresRouter.get('/facturas-proveedores/:id', getFacturaProveedor);
facturasProveedoresRouter.put('/facturas-proveedores/:id', updateFacturaProveedor);
facturasProveedoresRouter.delete('/facturas-proveedores/:id', removeFacturaProveedor);

export default facturasProveedoresRouter;