import { Router } from "express";
import {
  getPost,
  createPost,
  updatePost,
  removePost,
  getPosts,
} from "../controllers/posts.controllers.js";

const router = Router();

router.get("/maps", getPosts);

router.get("/maps/:id", getPost);

router.post("/maps", createPost);

router.put("/maps/:id", updatePost);

router.delete("/maps/:id", removePost);

export default router;