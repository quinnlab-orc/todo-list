const express = require("express");
const router = express.Router();
const Project = require("../../schemas/Projects");
const Todo = require("../../schemas/Todos");

// @route   POST api/projects.js
// @desc    Make project
// @access

router.post(
  //makes new project
  "/",
  [],
  async (req, res) => {
    const project = new Project({
      title: req.body.title,
    });

    await project.save();
    res.send("Project Route");
  }
);

router.get(
  //calls existing projects
  "/all",
  [],
  async (req, res) => {
    const findProject = await Project.find();
    res.json(findProject);
  }
);

router.post(
  //delete selected project
  "/delete",
  [],
  async (req, res) => {
    try {
      console.log(req.body.title);
      await Project.findOneAndRemove({ title: req.body.title });

      const findProject = await Project.find();
      res.json(findProject);
    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;

//route for each,
//make new project
//delete project
//call projects -- Done
