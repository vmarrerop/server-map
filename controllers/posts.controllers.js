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
    const { title, description, precio, precioCompra, unidad, cantidad, categoria, proveedor, sede, insumo } = req.body;
    let image = null;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newPost = new Post({ title, description, image, precio, precioCompra, unidad, cantidad, categoria, proveedor, sede, insumo});
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
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
    // Buscar el producto a actualizar
    const producto = await Post.findById(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Actualizar la información del producto excepto la imagen
    producto.title = req.body.title || producto.title;
    producto.description = req.body.description || producto.description;
    producto.proveedor = req.body.proveedor || producto.proveedor;
    producto.precio = req.body.precio || producto.precio;
    producto.precioCompra = req.body.precioCompra || producto.precioCompra;
    producto.unidad = req.body.unidad || producto.unidad;
    producto.cantidad = req.body.cantidad || producto.cantidad;
    producto.categoria = req.body.categoria || producto.categoria;

    // Actualizar la imagen solo si se proporciona una nueva imagen
    if (req.files?.image) {
      // Eliminar la imagen existente si existe
      if (producto.image.public_id) {
        // Implementa la lógica para eliminar la imagen de tu almacenamiento
        // Por ejemplo, con Cloudinary puedes usar el método destroy
        await cloudinary.uploader.destroy(producto.image.public_id);
      }
      // Subir la nueva imagen
      const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
      producto.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Guardar los cambios en la base de datos
    await producto.save();

    // Devolver la respuesta
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