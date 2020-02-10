import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';

const Forecast = () => {

    let [city, setCity] = useState('Sydney');
    let [unit, setUnit] = useState('imperial');

    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const uriEncodedCity = encodeURIComponent(city);

   let [responseObj, setResponseObj] = useState({});

   function getForecast(e) {

    e.preventDefault();

    if (city.length === 0) {
        return setError(true);
    }

      // weather data fetch function will go here
      fetch(`http://localhost:8080/api/weather/city-name?cityName=${city}`, {
       "method": "GET"  
       
   }).then(response => response.json())
     .then(response => {
        if (response.cityName === "") {
            console.log(response);
            throw new Error()
        }
    
          setResponseObj(response)
          console.log(response.cityName);
          setLoading(false);
      }).catch(err => {
        setError(true);
        setLoading(false);
        console.log(err.message);
    });

    
   }

   return (
    <div>
    <h2>Find Current Weather Conditions </h2>
   

    <form onSubmit={getForecast}>
                <select value={city}
                         onChange={(e) => setCity(e.target.value)}>
                        <option value="Sydney">Sydney</option>
                        <option value="Adelaide">Adelaide</option>
                        <option value="Brisbane">Brisbane</option>
                        <option value="Canberra">Canberra</option>
                        <option value="Darwin">Darwin</option>
                        <option value="Hobart">Hobart</option>
                        <option value="Melbourne">Melbourne</option>
                        <option value="Perth">Perth</option>
                </select>

                <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        className={classes.Radio}
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        className={classes.Radio}
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>

                <button className={classes.Button}  type="submit">Get Forecast</button>

            </form>
    
    <Conditions
              responseObj={responseObj}
              error={error} //new
              loading={loading} //new
              />
         <div>
            <table>
            <thead>
            <tr>
            <th>City</th>
            <th>Date</th>
            <th>Min-Temperature</th>
            <th>Max-Temperature</th>
            <th>windSpeed</th>
            
            </tr>
           
            </thead>
            <tbody>
            <tr>
                <td>{responseObj.cityName}</td>
                <td>{responseObj.calendarDate}</td>
                <td>{responseObj.minTemperature}</td>
                <td>{responseObj.maxTemperature}</td>
                <td>{responseObj.windSpeed}</td>
               
            </tr>
            </tbody>
            </table>
            </div>
    </div>
   )
}

export default Forecast;