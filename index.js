const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());

//BASE URL
const baseURL = "https://api.openweathermap.org/data/2.5/group?";

//Cities id on openweathermap
const cities = [
  819827, 524901, 1271881, 1283240, 703448, 1282898, 3632308, 1273294, 502069,
  3645532, 529368, 462755, 502018, 538601, 463355, 560756, 509820, 498817,
  547560, 1496747, 709717, 555746, 712969, 569591, 532477, 471457, 711660,
  564719, 564912, 571557,
];

//Pagination so that only 10 cites are returned
const cityPagination = (p = 0) => {
  const offsetCities = cities.slice(p * 10, 10 + p * 10);
  let returnCities = "";
  for (let i = 0; i < offsetCities.length; i++) {
    returnCities = returnCities + offsetCities[i] + ",";
  }
  return returnCities;
};

// weather api route
app.get("/weather", async (req, res) => {
  // try
  try {
    // getting query params from client
    const { q } = req.query;
    // q is being used to change cities with pagination function
    const cities = cityPagination(q);
    // calling openweathermap api to get weather cities provide in url and provide your api key in url
    const weather = await axios.get(
      baseURL + `id=${cities}&appid=${process.env.APIKEY}`
    );
    // Sending response back to client
    res.send(weather.data);
  } catch (e) {
    // catch exception if any and send it as a response to the client
    res.send(e);
  }
});

app.listen(5000, () => console.log("listening on port 5000"));
