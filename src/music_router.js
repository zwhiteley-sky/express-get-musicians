const express = require("express");
const { Musician } = require("../models/index")
const { db } = require("../db/connection")
const { validate } = require("./validator");
const { body, matchedData } = require("express-validator");
const music_router = express.Router();

music_router.get("/", async (req, res) => {
    res.json(await Musician.findAll());
});

music_router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).send("invalid id");

    const music = await Musician.findByPk(id);

    if (music) res.json(music);
    else res.status(404).send("musician not found");
});

music_router.post("/", validate([
    body("name")
        .notEmpty({ ignore_whitespace: true })
        .withMessage("name must not be empty")
        .trim(),
    body("instrument")
        .notEmpty({ ignore_whitespace: true })
        .withMessage("instrument must not be empty")
        .trim(),
]), async (req, res) => {
    const { name, instrument } = req.body;

    const music = await Musician.create({ name, instrument });
    res.json(music);
});

music_router.put("/:id", validate([
    body("name")
        .optional()
        .notEmpty({ ignore_whitespace: true })
        .withMessage("name must not be empty")
        .trim(),
    body("instrument")
        .optional()
        .notEmpty({ ignore_whitespace: true })
        .withMessage("instrument must not be empty")
        .trim(),
]), async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).send("invalid id");

    const { name, instrument } = req.body;

    const original = await Musician.findByPk(id);

    if (!original) return res.status(404).send("could not find musician");
    
    const updated = await original.update({ name, instrument });

    res.json(updated);
});

music_router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).send("invalid id");

    const original = await Musician.findByPk(id);

    if (!original) return res.status(404).send("could not find musician");

    await original.destroy();

    res.status(204).send();
});

module.exports = { music_router };
