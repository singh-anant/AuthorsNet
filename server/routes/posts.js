const express = require("express");
const {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} = require("../controller/post");
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

module.exports = router;
