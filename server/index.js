const express = require("express");
const app = express();
const port = 3001;
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// MongoDB connection URI
const mongoURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}/?retryWrites=true&w=majority`;

let usersDB;

// Create a MongoDB client
const client = new MongoClient(mongoURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect client and set databases
const run = async () => {
  try {
    await client.connect();
    const db = await client.db(process.env.DB_DATABASE);
    usersDB = db.collection("users");

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err);
  }
};
run();

const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

function isStrongPassword(password) {
  // Check for at least one number, one special character, one lowercase letter, one uppercase letter, and no spaces
  const passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",.<>?/\\])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$/;

  return passwordRegex.test(password);
}

app.get("/checkLogin", async (req, res) => {
  try {
    const { username, password } = req.query;
    const findUser = await usersDB.findOne({ username });
    let error;
    const secretKey = generateRandomString(32);

    if (findUser) {
      if (findUser.password === password) {
        const authToken = jwt.sign({ username }, secretKey, {
          expiresIn: "1h",
        });
        res.status(200).json({ success: "Successful login", authToken });
      } else {
        error = "password";
      }
    } else {
      error = "username";
    }

    if (error) {
      res.status(400).json({ error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

app.post("/checkRegister", async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await usersDB.findOne({ username });
    const checkPassword = isStrongPassword(password);
    let errors = [];
    const secretKey = generateRandomString(32);

    if (findUser) {
      errors.push("username");
    }
    if (!checkPassword) {
      errors.push("password");
    }

    if (!findUser && checkPassword) {
      errors = [];

      await usersDB.insertOne({
        username,
        password,
      });

      const authToken = jwt.sign({ username }, secretKey, {
        expiresIn: "1h",
      });

      res.status(200).json({ success: "Successful register", authToken });
    }

    if (errors.length > 0) {
      console.log(errors);
      res.status(500).json({ errors });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
