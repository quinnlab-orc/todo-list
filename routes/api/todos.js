const express = require("express");
const router = express.Router();
const Project = require("../../schemas/Projects");
const Todo = require("../../schemas/Todos");

// @route   POST api/todos.js
// @desc    Make todo
// @access

router.post(
  //makes new todo
  "/",
  [],
  async (req, res) => {
    try {
      const todo = new Todo({
        title: req.body.title,
        description: req.body.title,
        dueDate: req.body.title,
        project: req.body.project,
        complete: false,
      });

      await todo.save();
      res.send("Todo Route");
    } catch (err) {
      console.error(err.message);
    }
  }
);

// {
//     "title": "todo title",
//     "description": "random descriptions",
//     "dueDate": 2020-11-26,
//     "project": toodles,
//     "complete": false
// }

router.get(
  //calls existing todos
  "/all",
  [],
  async (req, res) => {
    const findTodo = await Todo.find();
    res.json(findTodo);
  }
);

module.exports = router;

//route for each:
//call todos
//make new todo
//delete todo
//toggle completion on todo
