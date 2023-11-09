const express = require("express");
const { Band, Musician } = require("../models/index")
const { db } = require("../db/connection")
const { validate } = require("./validator");
const { body, matchedData } = require("express-validator");
const band_router = express.Router();

band_router.get("/", async (req, res) => {
    res.json(await Band.findAll({
        include: Musician
    }));
});

band_router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).send("invalid id");

    const band = await Band.findByPk(id, {
        include: Musician
    });

    if (band) res.json(band);
    else res.status(404).send("band not found");
});

band_router.post("/", validate([
    body("name")
        .notEmpty({ ignore_whitespace: true })
        .withMessage("name must not be empty")
        .trim(),
    body("genre")
        .notEmpty({ ignore_whitespace: true })
        .withMessage("genre must not be empty")
        .trim()
]), async (req, res) => {
    const { name, genre } = req.body;

    const band = await Band.create({ name, genre });
    res.json(band);
});

band_router.put("/:id", validate([
    body("name")
        .optional()
        .notEmpty({ ignore_whitespace: true })
        .withMessage("name must not be empty")
        .trim(),
    body("genre")
        .optional()
        .notEmpty({ ignore_whitespace: true })
        .withMessage("genre must not be empty")
        .trim()
]), async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).send("invalid id");

    const { name, genre } = req.body;

    const original = await Band.findByPk(id);

    if (!original) return res.status(404).send("could not find band");
    
    const updated = await original.update({ name, genre });

    res.json(updated);
});

band_router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).send("invalid id");

    const original = await Band.findByPk(id);

    if (!original) return res.status(404).send("could not find band");

    await original.destroy();

    res.status(204).send();
});

module.exports = { band_router };
