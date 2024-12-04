/**
    ### Bonus
    - Provare a restituire la lista dei post dalla rotta index, in formato json
    - Provare a restituire un singolo post dalla rotta show, sempre in formato json
 */

// inizialization
const { writeFile } = require("fs");
const express = require("express");
const posts = require("../db/posts.json"); // automatic parsing
const router = express.Router();
console.log(typeof posts);

// routes
// index
router.get("/", (req, res) => {
    const dataFiltered = filterData(req, posts);
    let response = getResponse(dataFiltered);
    console.log(response);
    res.json(response);
    //////
    // const response = getResponse([...posts]);
    // res.json(response);
});

// show
router.get("/:id", (req, res) => {
    const postTarget = getDataById(req.params.id, posts);
    const response = getResponse(postTarget);
    res.json(response);
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
    let response = {};
    const indexTarget = getDataIndexById(req.params.id, posts);
    response = getResponse(posts[indexTarget]);
    if (indexTarget !== -1) {
        posts.splice(indexTarget, 1);
        overrideDB("assets/db/posts.json", posts, null, 4);
    }
    console.log(posts);
    res.json(response);
});

module.exports = router;

//* FUNCTIONS
function getDataIndexById(idTarget, data) {
    return data.findIndex((obj) => obj.id == idTarget);
}

function getDataById(idTarget, data) {
    return data.find((obj) => obj.id == idTarget);
}

function getResponse(data) {
    let response = {
        status: "not found",
        totalCount: 0,
        data: [],
    };
    if (data) {
        response.status = "ok";
        response.data = [].concat(data);
        response.totalCount = response.data.length;
    }
    return response;
}

function overrideDB(pathDB, data, replacer, space) {
    writeFile(
        pathDB,
        JSON.stringify(data, replacer, space),
        (error, result) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log("Scrittura asincrona completata");
        }
    );
}

function filterData(req, list) {
    const query = req.query;
    const keyTarget = Object.keys(query)[0];
    // query string vuota
    if (!Object.keys(query).length) {
        return list;
    }
    // param query string non valida
    if (!Object.keys(list[0]).includes(keyTarget)) {
        return list;
    }
    // key param query string = id
    if (keyTarget === "id") {
        const objTarget = getDataById(query[keyTarget], list);
        return objTarget;
    }
    // key param query string != id MA valida
    let queryValuesArr = convertToSortedArr(query[keyTarget]);
    queryValuesArr = convertElementsToStrLCase(queryValuesArr);
    let arrFiltered = [];
    // filtraggio "pesante"
    if (query["filter"] === "strict") {
        arrFiltered = filterStrict(keyTarget, queryValuesArr, list);
    }
    // filtraggio "leggero"
    else {
        arrFiltered = filterLight(keyTarget, queryValuesArr, list);
    }
    return arrFiltered;
}

function filterStrict(key, queryValues, data) {
    const arrFiltered = data.filter((obj) => {
        let dataTargetArr = convertToSortedArr(obj[key]);
        dataTargetArr = convertElementsToStrLCase(dataTargetArr);
        let isIncludedAll = dataTargetArr.every((val) => {
            return queryValues.includes(val);
        });
        return isIncludedAll;
    });
    return arrFiltered;
}

function filterLight(key, queryValues, data) {
    const arrFiltered = data.filter((obj) => {
        let dataTargetArr = convertToSortedArr(obj[key]);
        dataTargetArr = convertElementsToStrLCase(dataTargetArr);
        let isIncludedSome = dataTargetArr.some((val) => {
            return queryValues.includes(val);
        });
        return isIncludedSome;
    });
    return arrFiltered;
}

function convertElementsToStrLCase(arr) {
    return arr.map((el) => el.toString().toLowerCase());
}

function convertToSortedArr(element) {
    // converto in un array ordinato il parametro passato
    // NB: che sia primitivo o un array, il ritorno è cmq un array ordinato
    return [].concat(element).sort();
}
