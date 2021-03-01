const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const htmlRoutes = require('./routes/html_routes')
const apiRoutes = require('./routes/api_routes')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutTrack", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
