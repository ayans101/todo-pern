const { application } = require("express");
const express = require("express");
const router = express.Router();
const todoApi = require("../../controllers/api/todo_api");

// create a todo
router.post("/create", todoApi.create);

// get all todo
router.get("/all", todoApi.fetchAll);

// get a todo
router.get("/:id", todoApi.fetch);

// update a todo
router.put("/update/:id", todoApi.update);

// delete a todo
router.delete("/delete/:id", todoApi.delete);

module.exports = router;
