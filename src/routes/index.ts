const express = require("express");
import { Router } from "express";
const router: Router = express.Router();
import { sendCustomEmail } from "../controllers/emailController";
// const {
//   getAllBlogs,
//   createBlog,
//   updateBlog,
//   patchBlog,
//   getBlogbyId,
//   replyToComment,
//   deleteBlog,
//   commentOnBlog,
// } = require("../controllers/BlogController");
// import { authMiddleware } from "../Middleware/authMiddleware";

router.route("/").post(async (req, res, next) => {
  try {
    await sendCustomEmail(req, res);
    next();
  } catch (error) {
    next(error);
  }
});
// router.route("/").post(authMiddleware, createBlog);
// router.route("/:id").get(authMiddleware, getBlogbyId);
// router.route("/:id").put(authMiddleware, updateBlog);
// router.route("/:id").patch(authMiddleware, patchBlog);
// router.route("/:id").delete(authMiddleware, deleteBlog);
// router.route("/:id/comment").post(authMiddleware, commentOnBlog);
// router
//   .route("/:blogId/comment/:commentId/reply")
//   .post(authMiddleware, replyToComment);

module.exports = router;
