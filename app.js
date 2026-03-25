if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressErros.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const MongoStore = require("connect-mongo").default;

const DbURL = process.env.ATLAS_URL;

const store = MongoStore.create({
  mongoUrl: DbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 60 * 60, // time period in seconds after which the session will be updated in the database. if there is no change in the session then it will not be updated in the database.
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});
const sessionOps = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // date.now will written time in miliseconds. we will set expiry date after 1 week
    // 7 days * 24 hours * 60 minuts * 60 seconds * 1000 miliseconds.
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOps));
app.use(flash());
// session is required for the passport configuration , write the configurations after the sessions
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


app.use(methodOverride("_method"));

const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log("mongo db connection error");
    throw err;
  });
async function main() {
  await mongoose.connect(DbURL);
}

// app.get("/", (req, res) => {
//   res.send("this is root");
// });

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; // so that we can use it in ejs
  next();
});
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// app.get("/demouser",async (req,res)=>{
//   let newuser= new User({
//     email:"abcd@gmail.com",
//     username:"Jeffrey Esptine",
//   })
//   let registered=await User.register(newuser,"abcd1234") ; // <-- user, password
//   res.send(registered);
// })

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "page not found!"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.status(status).render("error.ejs", { message });
  // res.status(status).send(message);
});
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
