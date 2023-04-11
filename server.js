const app = require("./src/app");
const { sequelize } = require("./db")
const port = 3000;

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening at http://localhost:${port}/musicians`)
})