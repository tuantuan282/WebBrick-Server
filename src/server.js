const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();
require("dotenv").config();
//Cors Policy
var cors = require("cors");
app.use(cors());
app.options("*", cors());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["somesecretsauce"],
  })
);

//Database connected

mongoose.connect(
  "mongodb+srv://98tuantuan:Kenpro1998@cluster0.qdp8s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
mongoose.connection.on("connected", () => {
  console.log("MongoDB is connected!!!");
});

// Passport middleware & Passport config
app.use(passport.initialize());
require("./middleware/passport");

//Use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware

// HTTP Request Logger
const page = require("./routes/pageRoutes");
const user = require("./routes/userRoutes");

app.use(morgan("tiny"));
app.use("/api/page", page);
app.use("/api/user", user);

app.use(express.static(__dirname));
//Run on Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
