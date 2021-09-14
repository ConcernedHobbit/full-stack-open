import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
  const [ weather, setWeather ] = useState([])
  const [ weatherLoadingFailed, setWeatherLoadingFailed ] = useState(false)

  useEffect((city) => {
    axios
      .get(`https://wttr.in/${city}?format=j1`)
      .then(response => {
        if (weatherLoadingFailed) setWeatherLoadingFailed(false)
        setWeather(response.data)
      })
      .catch(error => {
        setWeatherLoadingFailed(true)
      })
  }, [])

  if (weatherLoadingFailed) return <div><h2>Weather in {city}</h2><p>Failed to load weather</p></div>
  if (weather.length === 0) return <div><h2>Weather in {city}</h2><p>Loading...</p></div>
  const currentCondition = weather.current_condition[0]

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p><strong>{currentCondition.weatherDesc[0].value}</strong></p>
      <p>The temperature is {currentCondition.temp_C}°C (feels like {currentCondition.FeelsLikeC}°C)</p>
      <p>Wind speed is {currentCondition.windspeedKmph}km/h {currentCondition.winddir16Point}</p>
      <p>The humidity is {currentCondition.humidity}%</p>
    </div>
  )
}

const Country = ({country}) => {
  const alternativeText = `The flag of ${country.name}`

  return (
    <div>
      <h1>{country.name}</h1>

      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>Languages</h2>
      <ul>
        { country.languages.map(lang => <li key={lang.iso639_2}>{lang.name} ({lang.nativeName})</li>) }
      </ul>
      <img alt={alternativeText} src={country.flag} height="256"/>

      <Weather city={country.capital} />
    </div>
  )
}

const CountryList = ({countries, setFilter}) => {
  if (countries.length === 0) return <div><p>No countries found</p></div>
  if (countries.length > 10) return <div><p>Too many matches to show ({countries.length})</p></div>
  if (countries.length > 1) {
    return (
      <div>
        { countries.map(country => <p key={country.name}>{country.name} ({country.nativeName}) <button onClick={() => setFilter(country.name)}>show</button></p>) }
      </div>
    )
  }
  return <div><Country country={countries[0]} /></div>
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  const handleFilterChange = event => setFilter(event.target.value)

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      <div>Find countries: <input value={filter} onChange={handleFilterChange} /></div>
      <CountryList countries={filteredCountries} setFilter={setFilter} />
    </>
  );
}

export default App
