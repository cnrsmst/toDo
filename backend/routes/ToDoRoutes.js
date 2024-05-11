const express = require("express");
const { getToDos, saveToDo, updateToDo, deleteToDo, getUserToDo } = require("../controller/ToDoController");
const { authenticate } = require('../middlewares/AuthMiddlewares');

const router = express.Router();

router.get("/get", getToDos);
router.post("/save", saveToDo);
router.put('/update/:id', updateToDo);
router.delete('/delete/:id', deleteToDo);
// router.get('/todos',authenticate,getUserToDo);

module.exports = router;