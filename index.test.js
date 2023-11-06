// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    test("Testing musicians endpoint", async () => {
        const response = await request(app).get("/musicians");

        for (let i = 0; i < response.body.length; ++i) {
            expect(response.body[i]).toMatchObject(seedMusician.seedMusician[i]);
        }
    });

    test("Testing musicians/id endpoint", async () => {
        const response = await request(app).get("/musicians/1");

        expect(response.body).toMatchObject(seedMusician.seedMusician[0]);
    });
});
