const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

app.get("/musicians", async (req, res) => {
    res.json(await Musician.findAll());
});

app.get("/musicians/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).send("invalid id");

    const music = await Musician.findByPk(id);

    if (music) res.json(music);
    else res.status(404).send("musician not found");
});

module.exports = app;
