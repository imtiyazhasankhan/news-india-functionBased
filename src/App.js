import './App.css';
import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Weather from './components/Weather';

export default function App() {
  const [title, setTitle] = useState(() => { return "News India" })
  const [category, setCategory] = useState(() => { return "general" })
  const [location, setLocation] = useState(() => { return [] })
  const [temp, setTemp] = useState(() => { return "" })
  const [country, setCountry] = useState(() => { return "india" })
  const [feelsLike, setFeelsLike] = useState(() => { return "Sleepy" })
  const [city, setCity] = useState(() => { return "kolkata" })
  const [searchUrl, setSearchUrl] = useState(() => null)
  const [search, setSearch] = useState(() => false)
  const [usrInptVlu, setusrInptVlu] = useState(() => { return "/" })

  // constructor() {
  //   super()
  //   this.state = {
  //     // title: "News India",
  //     // category: "general",
  //     // key: 'general',
  //     // location: [],
  //     // temp: '',
  //     // country: '',
  //     // feelsLike: "",
  //     // city: null,
  //     // searchUrl: null,
  //     // search: false,
  //     // usrInptVlu: "/"
  //   }
  // }

  useEffect(() => {
    const updateWeather = async () => {
      let geoLication = 'https://geolocation-db.com/json/'
      let locationData = await fetch(geoLication)
      let parsedLocation = await locationData.json()
      let currentUserLocation = parsedLocation.IPv4

      let weatherApi = `https://api.weatherapi.com/v1/current.json?key=c8ec5c78e09448f6bce75309220907&q=${currentUserLocation}&aqi=no`
      let data = await fetch(weatherApi)
      let parsedData = await data.json()
      setLocation(parsedData.location)
      setTemp(`${parsedData.current.temp_c}°`)
      setCountry(parsedData.location.country)
      setCity(parsedLocation.city)
      setFeelsLike(`Feels like ${parsedData.current.feelslike_c}`)

      // this.setState({
      //   location: parsedData.location,
      //   temp: `${parsedData.current.temp_c}°`,
      //   country: parsedData.location.country,
      //   city: parsedLocation.city,
      //   feelsLike: `Feels like ${parsedData.current.feelslike_c}`,
      // })
    }
    updateWeather()
  }, [])


  // _______________Search Function__________________
  const onChngFncSrchbr = () => {
    let user_input = `${document.getElementById("searchBox").value}`
    let setUserEnteredText = () => { setusrInptVlu(user_input.replace(/\s/g, '')) }
    setUserEnteredText()
    setSearchUrl(`https://newsapi.org/v2/everything?q=${usrInptVlu}&apiKey=d16597cdb40841e88f3ff8025f53224a`)
  }

  const searchFunc = async () => {
    let user_input = `${document.getElementById("searchBox").value}`
    let setUserEnteredText = () => {setusrInptVlu(user_input.replace(/\s/g, ''))}
    setUserEnteredText()
    setSearchUrl(`https://newsapi.org/v2/everything?q=${usrInptVlu}&apiKey=d16597cdb40841e88f3ff8025f53224a`)
    setSearch(true)

    document.getElementById("searchBarContainer").classList.remove("SM_SearchBar")
    document.getElementById("searchIcon").style.display = "block"
    document.getElementById("navMenus").style.display = "block"
    document.getElementById("searchBox").style.display = "none"
    document.getElementById("searchButton").style.display = "none"

    setTimeout(() => {
      if (this.state.searchUrl === "https://newsapi.org/v2/everything?q=/&apiKey=d16597cdb40841e88f3ff8025f53224a") {
        setTitle("World News")
      }
      else {setTitle("News India")}
    }, 1234);
  }

  // ______________________End of search func+____________________-


  return (

    <BrowserRouter>
      <Navbar title={title}
        searchFunction={searchFunc}
        userSearch={usrInptVlu}
        onChngFncSrchbr={onChngFncSrchbr} />
      <Weather
        temp={temp}
        city={city}
        country={country}
        feelsLike={feelsLike}
      />
      <Routes>

        <Route path="/" element={<News key={"general"} category={"general"} />}></Route>
        <Route path="/technology" element={<News key={"technology"} category={"technology"} />}></Route>
        <Route path="/science" element={<News key={"science"} category={"science"} />}></Route>
        <Route path="/sports" element={<News key={"sports"} category={"sports"} />}></Route>
        <Route path="/health" element={<News key={"health"} category={"health"} />}></Route>
        <Route path="/entertainment" element={<News key={"entertainment"} category={"entertainment"} />}></Route>

        {/* ___________For Searching from user___________ */}
        {search &&
          <Route path={`/${usrInptVlu}`} element={<News key={"userSearch"} searchUrl={searchUrl} />}></Route>
        }

      </Routes>
    </BrowserRouter>
  )

}

