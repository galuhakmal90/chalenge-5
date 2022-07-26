// index.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const carHandler = require('./controller/carController');
const loginHandler = require('./controller/loginController');
const path = require('path');

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handle storage using multer
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
})

let upload = multer({ storage: storage });

// login
app.get('/login', (req, res) => {
  res.render('login')
});
app.post('/login', loginHandler.login)

// GET all car
app.get("/", carHandler.listCar);

// Create a car
app.get("/game", (req, res) => {
  res.render('lol')
});
app.post("/car", upload.single('inputFoto'),  carHandler.addCar);

// Update a car
app.post("/update/:id", carHandler.editCarView);
app.post("/updated/:id", upload.single("inputFoto"), carHandler.editCar);

// Delete a car
app.post("/delete/:id", carHandler.deleteCar);

// listen on port
app.listen(5000, () => console.log("Server running at http://localhost:5000"));
