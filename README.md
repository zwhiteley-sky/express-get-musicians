![logo](https://user-images.githubusercontent.com/44912347/202296600-c5f247d6-9616-49db-88f0-38433429d781.jpg)

# Express Musicians
Over the next series of lessons we will be building an application using Express that will be able to `GET`, `POST`, `PUT`, and `DELETE` musicians from Musicians DB

## Setup
After forking and cloning the repository, run the following (`npm run seed` runs the seed file):

```bash
npm install
npm run seed
npm start
```

## Part 1: `GET` Musicians
1. Create a `GET /musicians` route for app with `req` and `res` parameters.
2. Get all musicians via the `Musician.findAll()` method within the route.
    - Remember to use `async` and `await`
    - Note that you only need to run `npm run seed` once in order to put data into the musician database.
3. Send the musicians as a JSON Response (`response.json()`).
4. Start your server with node server.js.
5. Test your endpoint by visiting http://localhost:3000/musicians. Your browser should output the following:

![Part 1 End Image](./assets/Part1.png)

6. In `index.test.js`, create tests to verify that your `GET /musicians` endpoint is returning the desired information. A few useful tips to aid your unit test creation:
    - The response to an endpoint can be accessed using the `supertest` package. You will need to require this in your testing file.
    ```javascript
    const request = require("supertest");
    ```
    - You can send a request using the `.get()` method
    ```javascript
    test("Testing bakedGoods endpoint", async () => {
        // Sends request to `/bakedGoods` endpoint
        const response = await request(app).get("/bakedGoods");
    })
    ```
    - A HTTP status code of 200 indicates a successful GET request was made. We can access a status code using the `response.statusCode` method.
    ```javascript
    test("Testing bakedGoods endpoint", async () => {
        // Sends request to `/bakedGoods` endpoint
        const response = await request(app).get("/bakedGoods");
        expect(response.statusCode).toBe(200);
    })
    ```
    - When sending data from a database the response sends a JSON string. To convert this back to a JSON object where we can access values, we can use `JSON.parse()` on the text in the response.
    ```javascript
    test("Testing bakedGoods endpoint", async () => {
        // Sends request to `/bakedGoods` endpoint
        const response = await request(app).get("/bakedGoods");
        const responseData = JSON.parse(response.text);
        // Write expect tests here
    })
    ```

## Part 2: Route Parameters
In `src/app.js`:
1. Use Express to create `GET /musicians/:id` endpoint.
2. In `GET /musicians/:id` get the id using the `req.params` object.
3. In `GET /musicians/:id` get the particular restaurant via the method `findByPk()`.
4. Send the found restaurant as a JSON response (`res.json()`).
5. Start your server with `node server.js`
6. Test your endpoint using Postman or your browser by sending a GET request to http://localhost:3000/musicians/1. Your browser should output the following on Postman:

![GET musicians/1 endpoint](./assets/Part2.png)

7. In `index.test.js`, create tests for this new endpoint.

## Part 3: `POST`, `PUT`, and `DELETE` Musicians
1. In the `server.js` file, include necessary middleware for parsing data provided in the request of the body.
2. Create an express route for creating (adding) a new restaurant on your musician database. For example, `/musicians` via a `POST` request would create a new database entry based on what is contained in the HTTP request body.
3. Create an express route for updating (replacing) an existing musician with a new musician on your musician database based on ID. For example, `/musicans/2` would update the musician with an ID of 2 with the content in the HTTP request body.
4. Create an express route for deleting (removing) a musician on your database. For example, `musicians/2` would delete the musician with an ID of 2 from the database.
5. Test your endpoint using Postman and make sure to use the correct HTTP Verb when making your requests to your server.

## Part 4: Express Router
1. Create a new directory for your express router(s).
2. Include a file within that directory to represent your express router
3. Define your express router to be able to handle creating, reading, updating, and deleting resources from your `Musicians` database
3. Export your router
4. Include a reference to your router in your main express server
5. Use the express router in your main server
6. Remove any pre-defined routes from your main server and use only your express router.
7. Test your endpoints using Postman. Make sure to test a `GET`, `POST`, `PUT`, and `DELETE` endpoint.

## Part 5: Server Side Validation
1. Run `npm install express-validator` to install the Express Validator package
2. Include the `check` and `validationResult` methods from the Express Validator package in your Express Router for musicians.
3. Navigate to your `POST` Request route to `/musicians` from your Express Router and include a parameter `[]` in between the endpoint and the callback function.
4. Within the array `[]` include a first item which checks that the “name” field in the `request.body` is not empty and doesn’t only contain whitespace.
5. Within the array `[]` include a second item that checks that the “instrument” in the `request.body` is not empty and doesn’t only contain whitespace.
6. Within the callback function, validate the results of your checks and store them in a variable named `errors`.
7. Check that if the `errors` reference is not empty (there are errors), respond with a JSON that contains the key `error` and the value `errors.array()`.
8. If the `errors` reference is empty (there are no errors), then continue with adding the musician to the `Musicians` DB and return a list of all the musicians including the newly added one.
9. Test your endpoint using Postman. 
    - Check to see if you can add a musician without a value in the “name” field.
    - Check to see if you can add a musician without a value in the “instrument” field.
