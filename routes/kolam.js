const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET request pengunjung
router.get("/", (req, res) => {
  db.query("SELECT * FROM kolamrenang", (err, pengunjung) => {
    if (err) {
      return res.status(500).send("Internal server rusak");
    }
    res.render('pengunjung', {
      title: "Pengunjung",
      pengunjung: pengunjung,
    })
  });
});

// POST method pengunjung
router.post("/", (req, res) => {
  const {nama, jumlah, jenis} = req.body;

  if (!nama || !jumlah || !jenis) {
    return res.status(400).send("WAjib di isi")
  }

  db.query(
    "INSERT INTO kolamrenang (id, nama, harga) VALUES (?,?,?)",
    [nama, jumlah, jenis],
    (err, result) => {
      if (err) return res.status(500).send("server rusak");
      const newHewan = {
        id: result.insertId,
        nama: nama.trim(),
        harga: harga.trim(),
      };
      res.status(201).json(newPengunjung)
    }
  )
});

// Route update 
router.put('/:id', (req, res) => {
  const { id, nama, harga } = req.body;

  db.query(
    "UPDATE hewan SET id = ?, nama = ?, harga = ? WHERE id = ?",
    [nama, jumlah, jenis, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send("Server Rusak");
      if (result.affectedRows === 0) {
        return res.status(404).send("gak tau")
      }
      res.json({id: req.params.id, nama, harga});
    }
  )
})

// Route delete 
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM hewan WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send("Server Rusak");
      if (result.affectedRows === 0) {
        return res.status(404);
      }
      res.send().status(204);
    }
  );
})

module.exports = router;