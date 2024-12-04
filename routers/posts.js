/**
    ### Bonus
    - Provare a restituire la lista dei post dalla rotta index, in formato json
    - Provare a restituire un singolo post dalla rotta show, sempre in formato json
 */

// inizialization
const express = require("express");
const {index, show, store, update, modify, destroy} = require("../controllers/postsController");
const router = express.Router();

// routes
// index
router.get("/", index);

// show
router.get("/:id", show);

// store
router.post("/", store);

// update
router.put("/:id", update);

// modify
router.patch("/:id", modify);

// destroy
router.delete("/:id", destroy);

module.exports = router;