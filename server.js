const express = require("express");
const malScraper = require("mal-scraper");
const app = express();
app.use(express.json());

// connect to react app
app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/animeNews", (req, res) => {
  const nbNews = 20;

  malScraper
    .getNewsNoDetails(nbNews)
    .then((data) => {
      //   res.send(data);
      //   console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
      //   console.log(err);
    });
});

app.get("/seasonAnime", (req, res) => {
  const year = 2022;
  const season = "fall";
  const type = "TV";

  malScraper
    .getSeason(year, season, type)
    // `data` is an object containing the following keys: 'TV', 'TVNew', 'TVCon', 'OVAs', 'ONAs', 'Movies' and 'Specials'
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/animeDetails/:id", (req, res) => {
  // console.log(req.params.id);
  const name = req.params.id;

  malScraper
    .getInfoFromName(name)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

app.get("/recommendedAnime/:title/:id", (req, res) => {
  const name = req.params.title;
  const id = req.params.id;

  malScraper
    .getRecommendationsList({ name, id })
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

app.listen(3001, () => {
  console.log("server started at port 3001", "http://localhost:3001");
});
