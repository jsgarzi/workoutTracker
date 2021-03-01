const express = require("express");
const mongoose = require("mongoose");

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://julian:4tJnoKa3IUuga3n5@jsgarzi1.vi02i.mongodb.net/workoutTrack?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

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
