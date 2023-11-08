const { Musician, Band } = require("./models/index")
const { db } = require("./db/connection");
const { seedMusician, seedBand } = require("./seedData");

const syncSeed = async () => {
    await db.sync({force: true});
    seedBand.map(band => Band.create(band));
    seedMusician.map(musician => Musician.create(musician));
}

syncSeed();
