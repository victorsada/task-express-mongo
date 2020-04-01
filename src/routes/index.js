const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.render("index", {
    tasks // es lo mismo que tasks:tasks
  });
});

router.post("/add", async (req, res) => {
  const task = new Task(req.body);
  await task.save(); //guarda en la base de datos
  res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Task.remove({ _id: id });
  res.redirect("/");
});

router.get("/turn/:id", async (req, res) => {
  const { id } = req.params; //Obtenemos el id que manda la pagina
  const task = await Task.findById(id); //encontramos en la base de datos el registro con ese id
  task.status = !task.status; //cambiamos el status. Si esta true pasa false, si esta false pasa true
  await task.save(); //guardamos el resultado cambiado en la base de datos
  res.redirect("/"); //redireccionamos nuevamente a la pagina principal
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.render("edit", { task });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  await Task.update({ _id: id }, req.body);
  res.redirect("/");
});

module.exports = router;
