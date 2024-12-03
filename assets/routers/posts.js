/**
    ### Bonus
    - Provare a restituire la lista dei post dalla rotta index, in formato json
    - Provare a restituire un singolo post dalla rotta show, sempre in formato json
 */

// inizialization
const express = require("express");
const posts = require("../db/posts.json"); // automatic parsing
const router = express.Router();
console.log(typeof posts);

// routes
// index
router.get("/", (req, res) => {
    let response = {
        operation: "index",
        status: "ok",
        totalCount: posts.length,
        data: [...posts],
    };
    console.log(response);
    res.json(response);
});
// show
router.get("/:id", (req, res) => {
    let response = {
        operation: "show",
        status: "ok",
        totalCount: undefined,
        data: undefined,
    };
    response.data = posts.find((post) => post.id == req.params.id);
    if (response.data) {
        response.data = [response.data];
        response.totalCount = response.data.length;
    } else {
        response = {
            404: "Not Found",
        };
    }
    console.log(response);
    res.send(response);
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
