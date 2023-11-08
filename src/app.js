const express = require("express");
const app = express();
const { music_router } = require("./music_router");

const port = 3000;

app.use(express.json());
app.use("/musicians", music_router);

module.exports = app;
