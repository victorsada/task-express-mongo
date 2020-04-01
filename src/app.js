const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const app = express();

//conectando la base de datos
mongoose
  .connect("mongodb://localhost/crud-mongo") //nos conectamos a la base de datos
  .then((db = console.log("DB CONECTED"))) // promesas (then(cuando es satisfactorio) y catch(cuando hay error): funciones que se ejecutan cuando pasa equis evento
  .catch(err => console.log(err));
//routes
const indexRoutes = require("./routes/index");
//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "/views")); //Aca le decimos a express donde esta la carpeta views. __dirname nos ubica la raiz dentro del proyecto. el path es para unir ambos directorios
app.set("view engine", "ejs"); // para usar ejs

//middleware
// app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //extend false porque en este proyecto le navegador no nos enviara archivos grandes, como imagenes, etc.. solo trabajaremos texto

//routes
app.use("/", indexRoutes);

//iniciando el servidor
app.listen(app.get("port"), (req, res) => {
  console.log(`Server on port ${app.get("port")}`);
});
