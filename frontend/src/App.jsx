import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
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
            }
            catch (error) {
                console.error('Error fetching flights:', error);
            }
        }

        fetchFlights().then(() => {() => console.log("Flights fetched")});
    }, []);
  
    return (
        <>
            <FilterableFlightsTable flights={flights} />

            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>

            <h1>Vite + React + FlightTracker</h1>

            <div className="card">
                <button onClick={() => setCount((c) => c + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>

            <p className="read-the-docs">
                FlightTracker front-end is now connected to your backend.
            </p>
        </>
    );
}

 


export default App