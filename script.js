function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = newName.value;
    

    fetch('https://dataservice.accuweather.com/locations/v1/cities/search?apikey=dxZ1EB60kofXq5Ns3NsV7BM0iceUnRI3&q=' + newName.value)
        .then(response => response.json())
        .then(data => {
            const key = data[0].Key
            console.log(key)
            
            
            fetch('https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + key + '?apikey=dxZ1EB60kofXq5Ns3NsV7BM0iceUnRI3&details=true')
                .then(response2 => response2.json())
                .then(data2 => {
                    const main = data2.DailyForecasts;
                    for (i = 0; i < 5; i++) {
                        const max = Number((main[i].Temperature.Maximum.Value - 32) * 5 / 9).toFixed(1);
                        const min = Number(((main[i].Temperature.Minimum.Value - 32) * 5 / 9)).toFixed(1);

                        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                        ];

                        const f = new Date((main[i].Date));
                        console.log(f);
                        console.log(f.getDate())
                        const month = monthNames[f.getMonth()].slice(0, 3);
                        

                        const d = main[i].Date.slice(8, 10) + "-" + main[i].Date.slice(5, 7) + "-" + main[i].Date.slice(2, 4);
                        document.getElementById("date" + (i + 1)).innerHTML = f.getDate()+" "+month;
                        document.getElementById("temp" + (i + 1)).innerHTML = "Max/Min Temp: " + max + "/" + min + "°C";

                        document.getElementById("detail" + (i + 1) + "day").innerHTML = main[i].Day.LongPhrase;
                        document.getElementById("sunrise" + (i + 1)).innerHTML = main[i].Sun.Rise.slice(11, 16);
                        document.getElementById("sunset" + (i + 1)).innerHTML = main[i].Sun.Set.slice(11, 16);
                        document.getElementById("pre" + (i + 1) + "day").innerHTML = "Precipitation : " + main[i].Day.PrecipitationProbability + "%";
                        document.getElementById("thu" + (i + 1) + "day").innerHTML = "Thunderstrom : " + main[i].Day.ThunderstormProbability + "%";
                        document.getElementById("rain" + (i + 1) + "day").innerHTML = "Rain Probability : " + main[i].Day.RainProbability + "%";
                        document.getElementById("wind" + (i + 1) + "day").innerHTML = "Wind Speed :  "+Number(main[i].Day.Wind.Speed.Value * 1.60934).toFixed(2) + " Km/h";

                        

                    }
                    for(i=0; i<5; i++){
                        document.getElementById("detail" + (i + 1) + "night").innerHTML = main[i].Night.LongPhrase;
                        document.getElementById("moonrise" + (i + 1)).innerHTML = main[i].Moon.Rise.slice(11, 16);
                        document.getElementById("moonset" + (i + 1)).innerHTML = main[i].Moon.Set.slice(11, 16);
                        document.getElementById("pre" + (i + 1) + "night").innerHTML = "Precipitaion : " + main[i].Night.PrecipitationProbability + "%";
                        document.getElementById("thu" + (i + 1) + "night").innerHTML = "Thunderstorm : " + main[i].Night.ThunderstormProbability + "%";
                        document.getElementById("rain" + (i + 1) + "night").innerHTML = "Rain : " + main[i].Night.RainProbability + "%";
                        document.getElementById("wind" + (i + 1) + "night").innerHTML = " Wind Speed : " + Number(main[i].Night.Wind.Speed.Value * 1.60934).toFixed(2) + " km/h";

                    }

                })
        })
        .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}



function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "bhopal";
    GetInfo();
}