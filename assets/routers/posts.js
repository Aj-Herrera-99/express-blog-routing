const express = require("express");
const router = express.Router();

// routes

// index
router.get("/", (req, res) => {
    res.send("index operation");
});
// show
router.get("/:id", (req, res) => {
    res.send("show operation -> id selected: " + req.params.id);
});
// store
router.post("/", (req, res) => {
    res.send("store operation");
});
// update
router.put("/:id", (req, res) => {
    res.send("update operation -> id selected: " + req.params.id);
});
// modify
router.patch("/:id", (req, res) => {
    res.send("partial modify operation -> id selected: " + req.params.id);
});
// destroy
router.delete("/:id", (req, res) => {
    res.send("destroy operation -> id selected: " + req.params.id);
});

module.exports = router;    
