import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import Post from "../models/Post.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description, precio, precioCompra, unidad, cantidad, tipo, cantidadPorcion, categoria, proveedor, sede, insumos } = req.body;

    let image = null;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Convertir `insumos` a un array si es un string JSON
    const insumosFormatted = insumos ? JSON.parse(insumos) : [];

    // Crear un nuevo post con los datos convertidos correctamente
    const newPost = new Post({
      title,
      description,
      tipo,
      image,
      precio: parseFloat(precio), // Asegurarse de que precio sea numérico
      precioCompra: parseFloat(precioCompra), // Asegurarse de que precioCompra sea numérico
      unidad,
      cantidadPorcion,
      cantidad: parseInt(cantidad, 10), // Asegurarse de que cantidad sea numérico
      categoria,
      proveedor,
      sede,
      insumos: insumosFormatted // Asegurarse de que insumos esté correctamente formateado
    });

    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    console.error("Error al crear el post:", error); // Log detallado del error
    return res.status(500).json({ message: error.message });
  }
};


export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.sendStatus(404);
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Post.findById(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    producto.title = req.body.title || producto.title;
    producto.description = req.body.description || producto.description;
    producto.proveedor = req.body.proveedor || producto.proveedor;
    producto.precio = req.body.precio || producto.precio;
    producto.precioCompra = req.body.precioCompra || producto.precioCompra;
    producto.unidad = req.body.unidad || producto.unidad;
    producto.cantidad = req.body.cantidad || producto.cantidad;
    producto.categoria = req.body.categoria || producto.categoria;
    producto.sede = req.body.sede || producto.sede;
    producto.cantidadPorcion = req.body.cantidadPorcion || producto.cantidadPorcion;
    producto.tipo = req.body.tipo || producto.tipo;
    
    if (req.files?.image) {
      if (producto.image.public_id) {
        await deleteImage(producto.image.public_id);
      }
      const result = await uploadImage(req.files.image.tempFilePath);
      producto.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Transforma los insumos y actualiza
    if (req.body.insumos) {
      producto.insumos = req.body.insumos.map(insumo => ({
        nombreInsumo: insumo.nombreInsumo,
        cantidadInsumo: insumo.cantidadInsumo,
      }));
    }

    await producto.save();
    res.status(200).json({ message: "Producto actualizado correctamente", producto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};


export const removePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (post && post.image.public_id) {
      await deleteImage(post.image.public_id);
    }

    if (!post) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};