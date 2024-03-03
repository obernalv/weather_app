import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import getLocation from './components/scripts/Location';
import ErrorPermiso from './components/ErrorPermiso';

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)
  const [inputValue, setInputValue] = useState('') //diciendole que es vacio no null

  const defaultImage  = '/images/default.jpg'
  //const [imgSelected, setImgSelected] = useState(defaultImage)


  const success = info => {

    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude
    })
  }



  useEffect(() => {

    //navigator.geolocation.getCurrentPosition(success)
    getLocation(success, setAccessDenied)


  }, [])



  useEffect(() => {
    if (coords) {
      const APIKEY = '85cbdc1a6c297721e5b605cb820e0b2d'
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      
      if(inputValue !== ""){
        url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      }

      //then y catch son metodos de promesas
      axios.get(url)
        .then(rpta => {
          setWeather(rpta.data)
          const celsius = (rpta.data.main.temp - 273).toFixed(1)
          const fahrenheit = ((9 / 5 * celsius) + 32).toFixed(1)
          setTemp({
            celsius,
            fahrenheit
          })
        })
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false))
    }

  }, [coords, inputValue])


  const getBackgroundImage = () => {
    if (!weather) return null;
  
    let weatherCondition = weather.weather[0].main;

    switch (weatherCondition) {
      case 'Clear':
        return '/images/clear.jpg';
      case 'Clouds':
        return '/images/nubes.jpg';
      case 'Rain':
        return '/images/rain.jpg';
      case 'Drizzle':
        return '/images/moderate.jpg'; //llovizna
      case 'Thunderstorm':
        return '/images/tormenta.jpg';
      case 'Snow':
        return '/images/nieve.jpg';
      case 'Mist':
        return '/images/neblina.jpg';
      case 'Smoke':
        return '';
      case 'Haze':
        return '';
      case 'Dust':
        return '';
      case 'Fog':
        return '';
      case 'Sand':
        return '';
      case 'Ash':
        return '';
      case 'Squall':
        return '';
      case 'Tornado':
        return '/images/tornado.jpg';

      default:
        return defaultImage;
    }
  };

  // const objStyle = {
  //   backgroundImage: `url("/images/${ getBackgroundImage }.jpg")`
  // }


  return (
    <div className='app' style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
      {
        accessDenied ? (
          <ErrorPermiso />
        ) : (
          <>

            { 
            
              isLoading ? (
                <Loader />
              ) : accessDenied ? (
                <ErrorPermiso />
              ) : (
                
                <WeatherCard
                  weather={weather}
                  temp={temp}
                  setInputValue = {setInputValue}
                />
              )
            }

          </>
        )

      }


    </div>
  )
}

export default App
