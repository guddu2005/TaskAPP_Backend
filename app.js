const express = require("express");
const path = require("path");

const mthodOverride = require("method-override");

const { connectToMongoDB } = require("./connect");
const { taskRouter } = require("./routes/task")
const { userRouter } = require("./routes/user");
const staticRouter = require("./routes/staticRoutes");
const { MONGO_URL } = require("./env");
const { default: mongoose } = require("mongoose");
// inittailize app:-
const app = express();
const PORT = 5000;


//connecting to database:-
mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDb Connected")
}).catch((err) => {
    console.error('failed to connrct to MongoDB');

})


//setting ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware:-
app.use(mthodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/task", taskRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);




// starting the  app;
app.listen(PORT, () => {
    console.log(`Server Started on port:${PORT}`);
})
