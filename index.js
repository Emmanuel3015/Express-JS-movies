import express from "express";
import { fileURLToPath } from "url";
import path from "path";

let app = express();

let port = 3000;

// path to html file
let __fileName = fileURLToPath(import.meta.url);
console.log({ __fileName });

let __dirName = path.dirname(__fileName);
console.log({ __dirName });

// Template setup
app.set("views", "./views");
app.set("view engine", "pug");

// link static files
app.use(express.static("public"));

// home route
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirName, "public", "index.html"));
});

// series route
app.get("/series", async (req, res) => {
  let seriesRes = await fetch("https://api.themoviedb.org/3/discover/tv", {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDE3MjU3YmEzOGFjNGU2ODdjMjNkMWU0NTEwNTE5OCIsIm5iZiI6MTYyNzU2MjU1My4yNDE5OTk5LCJzdWIiOiI2MTAyYTIzOTY1MTdkNjAwNDY4MjYxN2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hPneiZ_sQWKtjllU3CDufEWDufydM8a97AVzcgQNY-o",
    },
  });
  let series = await seriesRes.json();
  console.log({ series });
  // res.json(series);
  res.render("series", { data: series.results });
});

// movies route
app.get("/movies", async (req, res) => {
  let movieRes = await fetch("https://api.themoviedb.org/3/discover/movie", {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDE3MjU3YmEzOGFjNGU2ODdjMjNkMWU0NTEwNTE5OCIsIm5iZiI6MTYyNzU2MjU1My4yNDE5OTk5LCJzdWIiOiI2MTAyYTIzOTY1MTdkNjAwNDY4MjYxN2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hPneiZ_sQWKtjllU3CDufEWDufydM8a97AVzcgQNY-o",
    },
  });
  let movies = await movieRes.json();
  console.log({ movies });
  // res.json(movies);
  res.render("movies", { data: movies.results });
});

// Individual movie
app.get("/movies/:id", async (req, res) => {
  let id = req.params.id;
  console.log({ id });

  let movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDE3MjU3YmEzOGFjNGU2ODdjMjNkMWU0NTEwNTE5OCIsIm5iZiI6MTYyNzU2MjU1My4yNDE5OTk5LCJzdWIiOiI2MTAyYTIzOTY1MTdkNjAwNDY4MjYxN2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hPneiZ_sQWKtjllU3CDufEWDufydM8a97AVzcgQNY-o",
    },
  });
  let movie = await movieRes.json();
  console.log({ movie });
  // res.json(movies);
  res.render("movie", { data: movie });
});

// Individual serie
app.get("/series/:id", async (req, res) => {
  let id = req.params.id;
  console.log({ id });

  let serieRes = await fetch(`https://api.themoviedb.org/3/tv/${id}`, {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDE3MjU3YmEzOGFjNGU2ODdjMjNkMWU0NTEwNTE5OCIsIm5iZiI6MTYyNzU2MjU1My4yNDE5OTk5LCJzdWIiOiI2MTAyYTIzOTY1MTdkNjAwNDY4MjYxN2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hPneiZ_sQWKtjllU3CDufEWDufydM8a97AVzcgQNY-o",
    },
  });
  let serie = await serieRes.json();
  console.log({ serie });
  res.render("serie", { data: serie });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
