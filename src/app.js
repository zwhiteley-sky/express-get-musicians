const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

app.use(express.json());

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

app.post("/musicians", async (req, res) => {
    const { name, instrument } = req.body;

    const music = await Musician.create({ name, instrument });
    res.json(music);
});

app.put("/musicians/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).send("invalid id");

    const { name, instrument } = req.body;

    const original = await Musician.findByPk(id);

    if (!original) return res.status(404).send("could not find musician");
    
    const updated = await original.update({ name, instrument });

    res.json(updated);
});

app.delete("/musicians/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).send("invalid id");

    const original = await Musician.findByPk(id);

    if (!original) return res.status(404).send("could not find musician");

    await original.destroy();

    res.status(204).send();
});

module.exports = app;
