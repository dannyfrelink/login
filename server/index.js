const express = require("express");
const app = express();
const port = 3001;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const { users } = require("./mongoDB.json");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

function isStrongPassword(password) {
  // Check for at least one number, one special character, one lowercase letter, one uppercase letter, and no spaces
  const passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",.<>?/\\])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$/;

  return passwordRegex.test(password);
}

app.get("/checkLogin", (req, res) => {
  try {
    const { username, password } = req.query;
    const findUser = users.find((user) => user.username === username);
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

app.post("/checkRegister", (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = users.find((user) => user.username === username);
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

      users.push({
        username,
        password,
      });

      const authToken = jwt.sign({ username }, secretKey, {
        expiresIn: "1h",
      });

      res.status(200).json({ success: "Successful register", authToken });
    }

    if (errors.length > 0) {
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
