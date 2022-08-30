// import {} from 'jest';
const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../../server");

describe("contact tetss", () => {
  beforeAll(async () => {
    // const db = "mongodb://localhost:27017/code-test-aug-2022";
    const db =
      "mongodb+srv://dev:i4pHkT9ZorKKtm6s@cluster0.og5h6.mongodb.net/devtest?retryWrites=true&w=majority";
    //connect to Mongo
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  });

  afterEach(async () => {
    await server.close();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it("should fetch contacts", async () => {
    const res = await request(server)
      .get("/api/contacts/")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(200);
  });

  it("should fetch contacts companies", async () => {
    const res = await request(server)
      .get("/api/contacts/company")
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(200);
  });
});
