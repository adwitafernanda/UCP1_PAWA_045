const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware untuk parsing body form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route untuk pengunjung
const pengunjungRoutes = require("./routes/pengunjung");
app.use("/pengunjung", pengunjungRoutes);

// Route untuk halaman utama (index)
app.get('/', (req, res) => {
    res.render('index', { title: 'Halaman Utama' });
  })

// Port server
app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
