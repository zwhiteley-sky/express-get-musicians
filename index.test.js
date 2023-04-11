// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { sequelize } = require('./db');
const { Musician } = require('./models/Musician')
const app = require('./app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    
    




    
})