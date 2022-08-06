import React from 'react'

export default function Weather(props) {
  let { temp, country, city, feelsLike } = props
  return (
    <div className="weather">
      <div className="wLeft">

        <div className="weatherInfoContainer">
          <div id="temp">{temp}</div>
          <div className="locationAndMoreContainer">
            <div className="wInf">{feelsLike}</div>
            <div className="location">{city}, {country}</div>
          </div>
        </div>

      </div>
      <div className="wRight">
        <div className="sooraj"></div>
      </div>
      <div className="cloud"></div>
      <div className="cloud1"></div>
    </div>
  )
}
