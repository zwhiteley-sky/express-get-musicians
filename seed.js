const { Musician, Band } = require("./models/index")
const { sequelize } = require("./db");
const { seedMusician, seedBand } = require("./seedData");

const syncSeed = async () => {
    await sequelize.sync({force: true});
    seedMusician.map(musician => Musician.create(musician));
    seedBand.map(band => Band.create(band));
}

syncSeed()