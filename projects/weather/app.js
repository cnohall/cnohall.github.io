
window.addEventListener('load', () => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/332f745cbcc9479131eb256039e66f71/${lat},${long}`
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const { temperature, summary, icon } = data.currently;
                //Set DOM Elements from the API
                temperatureDegree.textContent = Math.round(temperature);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Translate Degrees
                const celcius = (temperature - 32) / 1.8;
                //Set Icon
                setIcon(icon, document.querySelector('.icon'))
                //Change temperature to Celsius/Fahrenheit
                temperatureSection.addEventListener('click', () => {
                    changeTemperatureSection(temperature, celcius);
                });
            });
        });
        
    } else{
        h1.textContent = "Please enable your location"
    }

    function setIcon(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
    function changeTemperatureSection(fahrenheit, celcius){
        if(temperatureSpan.textContent ==="F°"){
            temperatureSpan.textContent = "C°";
            temperatureDegree.textContent = Math.round(celcius);
        } else {
            temperatureSpan.textContent ="F°"
            temperatureDegree.textContent = Math.round(fahrenheit);
        }
    }
});