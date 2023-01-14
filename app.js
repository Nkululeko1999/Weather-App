const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res){

  const query = req.body.cityname;
  const apiKey = "2470b3e9d0fa29f8fd0aeeeb250e9760";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      console.log(data);

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescr = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      // console.log(weatherData);
      // console.log(temp);

      res.write("<p>Temperarure in " + query + " is " + temp + "</p>");
      res.write("<h1> Description " + weatherDescr + "</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();

    });
  });

});

app.listen(3000, function(){
  console.log("I got my server running on port 3000");
});
