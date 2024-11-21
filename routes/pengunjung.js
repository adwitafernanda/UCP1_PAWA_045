const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Menampilkan halaman daftar pengunjung
router.get("/", (req, res) => {
  db.query("SELECT * FROM kolamrenang", (err, pengunjung) => {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    res.render("pengunjung", {
      title: "Daftar Pengunjung Kolam Renang",
      pengunjung: pengunjung,
    });
  });
});

// Menampilkan form tambah pengunjung
router.get("/add", (req, res) => {
  res.render("addpengunjung", { title: "Tambah Pengunjung" });
});

// Menambahkan data pengunjung
router.post("/add", (req, res) => {
  const { nama, harga } = req.body;

  if (!nama || !harga) {
    return res.status(400).send("Semua data (nama dan harga) wajib diisi");
  }

  db.query(
    "INSERT INTO kolamrenang (nama, harga) VALUES (?, ?)",
    [nama.trim(), harga],
    (err, result) => {
      if (err) return res.status(500).send("Internal server error");
      res.redirect("/pengunjung"); // Redirect ke halaman daftar pengunjung
    }
  );
});

// PUT request: Mengupdate data pengunjung berdasarkan ID
router.put("/:id", (req, res) => {
  const { nama, harga } = req.body;

  if (!nama || !harga) {
    return res.status(400).send("Semua data (nama dan harga) wajib diisi");
  }

  db.query(
    "UPDATE kolamrenang SET nama = ?, harga = ? WHERE id = ?",
    [nama.trim(), harga, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send("Internal server error");
      if (result.affectedRows === 0) {
        return res.status(404).send("Data tidak ditemukan");
      }
      res.json({ id: req.params.id, nama, harga });
    }
  );
});

// DELETE request: Menghapus data pengunjung berdasarkan ID
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM kolamrenang WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send("Internal server error");
      if (result.affectedRows === 0) {
        return res.status(404).send("Data tidak ditemukan");
      }
      res.status(204).send(); // No content
    }
  );
});

module.exports = router;
