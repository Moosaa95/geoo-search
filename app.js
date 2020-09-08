const qs = (prop) => document.querySelector(prop)
const qsAll = (prop) => document.querySelectorAll(prop)

const [form, input, list, msg, locate, cityTemp] = [qs('form'), qs('input'), qs('.cities'), qs('.msg'), qs("[data-locate]"), qs('.city-temp')]


const weather = {}

weather.unit = ["celsius"]



//section dom 

const locationOne = qs('.city-Location')
const countryName = qs('[data-country]')
const windSpeed = qs('.wind-speed')
const humidity = qs('.humidity')
const tempDesc = qs('.temperature-description')
const iconDiv = qs('[data-icon]')
const dataCityTemp = qs('.city-temp')
const dataImage = qs('.imgData')
const weatherIcon = qs('.weather-icon')

let mymap = L.map('map').setView([0, 0], 13);

const myApiKey = "ef8025cb0e78735ff607582687ba82e9"


form.addEventListener('submit', e => {

    //prevent it from reloading the page automatically
    e.preventDefault()

    //check to see if connected to an internet else show a message
    if (navigator.onLine) {


        const inputVal = input.value
            //api gotten from 'openweathermap.org'
        const myUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${myApiKey}&units=metric`
        console.log(myUrl);
        //working with the api
        fetch(myUrl)
            .then(response => response.json())
            .then(data => {

                const { main, name, sys, weather, wind, coord } = data

                const { lat, lon } = coord
                console.log(lat, lon);

                const icon = `https://openweathermap.org/img/wn/${
                weather[0]["icon"]
              }@2x.png`


                locationOne.innerHTML = `${name}`
                countryName.innerHTML = `${sys.country}`
                humidity.innerHTML = `humdity:${main.humidity} %`
                windSpeed.innerHTML = `wind-speed:${wind.speed} km/hr`
                dataCityTemp.innerHTML = `${Math.round(main.temp)}<sup>°C</sup>`
                weatherIcon.innerHTML = `<img src="${icon}"/>`
                tempDesc.innerHTML = `${weather[0]["description"]}`




                //setting up  the map tiles
                const mapContainer = qs('.map--container')

                mapContainer.style.visibility = 'visible'

                let myLat = lat //position.coords.latitude
                let myLong = lon //position.coords.longitude

                //custom marker 
                const greenIcon = L.icon({
                    iconUrl: `img/loc.png`,


                    iconSize: [38, 95], // size of the icon

                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
                let marker = L.marker([0, 0], { icon: greenIcon }).addTo(mymap);


                const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                const tiles = L.tileLayer(tileUrl, {
                    maxZoom: 18,
                    attribution
                })

                tiles.addTo(mymap)
                mymap.setView([myLat, myLong])
                marker.setLatLng([myLat, myLong])
                    .bindPopup(`${name}`)
                    .openPopup();



















                //function to convert celsius to fahrenheit
                function celsiusToFahr(temperature) {
                    return (temperature * 9 / 5) + 32

                }
                dataCityTemp.addEventListener('click', function() {
                    //const tempSup = qs('.city-temp sup')

                    //if (tempSup.textContent === "°C") {
                    if (weather.unit == 'celsius') {
                        let fahrenheit = celsiusToFahr(main.temp)
                        fahrenheit = Math.floor(fahrenheit)
                        dataCityTemp.innerHTML = `${fahrenheit}<sup>°F</sup>`
                        weather.unit = "fahrenheit"



                    } else {

                        dataCityTemp.innerHTML = `${Math.round(main.temp)}<sup>°C</sup>`
                        weather.unit = 'celsius'
                    }

                })

            })




        .catch(() => {
            msg.textContent = "Please enter a valid location to search for 😩"
        })

        msg.textContent = "";
        form.reset();
        input.focus();





    } else {
        form.reset()
        msg.textContent = "Please check your internet connection"

    }





})