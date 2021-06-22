const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");
const ejs = require("ejs");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");



app.get("/",function(req, res){
    res.render("home");
})

app.get("/about",function (req,res) {
    res.render("about");
})

app.post("/", function(req,res){
    const city = req.body.cityName
    const apiKey = "c3714e9dbe95f89b6d319be9500941a7"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit+""

    https.get(url, function(response){
        response.on("data", function(data){
            const weather = JSON.parse(data)
            const place = weather.name
            const temp = weather.main.temp
            const desp = weather.weather[0].description
            const speed = weather.wind.speed
            const iconName = weather.weather[0].icon
            const icon = "http://openweathermap.org/img/wn/"+iconName+"@2x.png"
            const humility = weather.main.humidity


            let time = new Date();
            let days = time.getDay();
            let day ="";
            switch (days) {
                case 0:
                    day = "Sunday";
                    break;
            
                case 1:
                    day = "Monday"
                    break;
                case 2:
                    day = "Tuesday";
                    break;
                
                case 3:
                    day = "Wednesday"
                    break;
                case 4:
                    day = "Thursday";
                    break;
                case 5:
                    day = "Friday"
                    break;
                case 6:
                    day = "Saturday"
                    break;
            }
            res.render("weather",{placeName:place, temperature:temp, icon:icon, Day:day, desp:desp, speed:speed, hum:humility})
        })
    })

})



app.listen(process.env.PORT || 3000, function(){
    console.log("The server is started at Port: 3000");
})