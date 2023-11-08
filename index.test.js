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

    test("can create a musician", async () => {
        const response = await request(app)
            .post("/musicians")
            .send({ name: "Zachary", instrument: "Triangle" });

        expect(response.body).toMatchObject({ name: "Zachary", instrument: "Triangle" });

        const users = await request(app).get("/musicians");
        expect(users.body.length).toBe(4);
    });

    test("can update a musician", async () => {
        const response = await request(app)
            .put("/musicians/4")
            .send({ name: "Zach" });

        expect(response.body).toMatchObject({ name: "Zach", instrument: "Triangle" });

        const user = await request(app).get("/musicians/4");
        expect(user.body).toMatchObject({ name: "Zach", instrument: "Triangle" });
    });

    test("can delete musician", async () => {
        const response = await request(app)
            .delete("/musicians/4")
            .expect(204);

        const user = await request(app).get("/musicians/4").expect(404);
    });
});

describe('./bands endpoint', () => {
    test("Testing bands endpoint", async () => {
        const response = await request(app).get("/bands");

        for (let i = 0; i < response.body.length; ++i) {
            expect(response.body[i]).toMatchObject(seedMusician.seedBand[i]);
        }
    });

    test("Testing bands/id endpoint", async () => {
        const response = await request(app).get("/bands/1");

        expect(response.body).toMatchObject(seedMusician.seedBand[0]);
    });

    test("can create a band", async () => {
        const response = await request(app)
            .post("/bands")
            .send({ name: "Zachary", genre: "Triangle" });

        expect(response.body).toMatchObject({ name: "Zachary", genre: "Triangle" });

        const users = await request(app).get("/bands");
        expect(users.body.length).toBe(4);
    });

    test("can update a band", async () => {
        const response = await request(app)
            .put("/bands/4")
            .send({ name: "Zach" });

        expect(response.body).toMatchObject({ name: "Zach", genre: "Triangle" });

        const user = await request(app).get("/bands/4");
        expect(user.body).toMatchObject({ name: "Zach", genre: "Triangle" });
    });

    test("can delete band", async () => {
        const response = await request(app)
            .delete("/bands/4")
            .expect(204);

        const user = await request(app).get("/bands/4").expect(404);
    });
});
