const PORT = 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

app.use(cors());
let planets = JSON.parse(fs.readFileSync(`${__dirname}/nph-nstedAPI.json`, `utf-8`));

planets = planets.map((planet) => ({
  name: planet.pl_name,
  size: planet.pl_radj
}));

planets = planets.filter((planet) => planet.size !== null);

planets.sort((item1, item2) => {
  if (item1.size > item2.size) return -1;
  else return 1;
});

app.get(`/planets`, (req, res) => {
  res.json([...planets.filter((_, idx) => idx < 10)]);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
