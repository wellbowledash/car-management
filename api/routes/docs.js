import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("https://documenter.getpostman.com/view/32315602/2sAY55cJwU");
});

export default router
