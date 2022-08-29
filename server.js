const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());

const sanitizer = require("express-html-sanitizer");

// const db = "mongodb+srv://dev:i4pHkT9ZorKKtm6s@cluster0.og5h6.mongodb.net/devtest?retryWrites=true&w=majority";
const db = "mongodb://localhost:27017/code-test-aug-2022";
//connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.log(err));

const config = {
  allowedTags: [],
  allowedAttributes: {},
  allowedIframeHostnames: [],
};
const sanitizeReqBody = sanitizer(config);

app.use("/api/contacts", sanitizeReqBody);

// use routes
app.use("/api/contacts", require("./routes/api/contacts"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);
module.exports = server;
