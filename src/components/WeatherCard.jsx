import { useRef, useState } from "react"
import './styles/WeatherCard.css'



const WeatherCard = ({ weather, temp, setInputValue }) => {

    const [isCelsius, setIsCelsius] = useState(true)
    const changeTemperture = () =>{
        setIsCelsius(!isCelsius)
    }

    //Virtual DOM(copia), este es el uso en reemplazo del DOM original 
    const inputSearch = useRef()
    const handleSubmit = evt => {
        evt.preventDefault()
        setInputValue(inputSearch.current.value.trim().toLowerCase())
    }

    
  
    return (

        <article className="weather">

                <form onSubmit={handleSubmit}>
                    <input 
                        ref={inputSearch}
                        id="weather__input" 
                        className="weather__input" 
                        type="text" 
                        placeholder="city or country" 
                        maxLength={30} 
                        autoComplete="off"
                    />

                </form>



            <h1 className="weather__title">Weather Apps</h1>
            <h2 className="weather__country">{weather?.name}, {weather?.sys.country}</h2>
        
            <section className="weather__body">
                <header className="weather__img">
                    <img className="weather__icon" src={weather && `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
                </header>
                
                <article className="weather__condition">
                    <h3 className="weather__description">{weather?.weather[0].description}</h3>            
                    <ul className="weather__list">
                        <li className="weather__item">
                            <span className="weather__label">Wind speed: </span>
                            <span className="weather__value">{weather?.wind.speed}meter/sec</span>
                        </li>
                        <li className="weather__item">
                            <span className="weather__label">Clouds: </span>
                            <span className="weather__value">{weather?.clouds.all}%</span>
                        </li>
                        <li className="weather__item">
                            <span className="weather__label">Pressure: </span>
                            <span className="weather__value">{weather?.main.pressure}hPa</span>
                        </li>
                    </ul>
                </article>
            </section>

            <section className="weather__principal">
                <h2 className="weather__temp">{isCelsius ?  `${temp?.celsius} C°` : `${temp.fahrenheit} F°`}</h2>
            </section>

            <footer className="weather__footer">
                <button className="weather__btn" onClick={changeTemperture}>Change To F/C°</button>
            </footer>

        </article>

    
    )
}

export default WeatherCard