import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    </div>
  )
}

const CountryList = ({countries}) => {
  if (countries.length === 0) return <div><p>No countries found</p></div>
  if (countries.length > 10) return <div><p>Too many matches to show ({countries.length})</p></div>
  if (countries.length > 1) {
    return (
      <div>
        { countries.map(country => <p key={country.name}>{country.name} ({country.nativeName})</p>) }
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
      <CountryList countries={filteredCountries} />
    </>
  );
}

export default App
