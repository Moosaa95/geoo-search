const qs = (prop) => document.querySelector(prop)
const qsAll = (prop) => document.querySelectorAll(prop)

const [form, input, list, msg, locate, cityTemp] = [qs('form'), qs('input'), qs('.cities'), qs('.msg'), qs("[data-locate]"), qs('.city-temp')]


//const weather = {}

//weather.unit = ["celsius"]



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


const myApiKey = "ef8025cb0e78735ff607582687ba82e9"


form.addEventListener('submit', e => {

    //prevent it from reloading the page automatically
    e.preventDefault()
    const inputVal = input.value
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

                const { main, name, sys, weather, wind } = data

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








                //function to convert celsius to fahrenheit
                function celsiusToFahr(temperature) {
                    return (temperature * 9 / 5) + 32

                }
                dataCityTemp.addEventListener('click', function() {
                    const tempSup = qs('.city-temp sup')
                    if (tempSup.textContent === "°C") {

                        let fahrenheit = celsiusToFahr(Math.round(main.temp))
                        fahrenheit = Math.floor(fahrenheit)
                        dataCityTemp.innerHTML = `${fahrenheit}<sup>°F</sup>`



                    } else {

                        dataCityTemp.innerHTML = `${Math.round(main.temp)}<sup>°C</sup>`
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

        msg.textContent = "Please check your internet connection"
    }







})