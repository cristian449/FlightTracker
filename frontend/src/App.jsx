// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {useEffect, useState} from 'react'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import FilterableFlightsTable from './components/flight/filterableFlightsTable.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/v1/flights");
                setFlights(response.data);
            } catch (error) {
                console.log("Failed to fetch Flights:", error);
            }
          }
  const flights = [
    { id: 1, name: "Flight 101", from: "New York", to: "Los Angeles", length: 300 },
    { id: 2, name: "Flight 202", from: "Chicago", to: "Miami", length: 180 },
    { id: 3, name: "Flight 303", from: "San Francisco", to: "Seattle", length: 120 },
  ];

  fetchFlights().then(() => console.log("Success fetching Flights"));
    }, []);
    return (<>
            <FilterableFlightsTable flights={flights}/>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>

            <h1>Vite + React</h1>

            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>)
}

export default App