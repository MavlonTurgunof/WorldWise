import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CityContext = createContext();

const BASE_URL = "http://localhost:8000";

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CityContext.Provider>
  );
}

// function useCities() {
//   const context = useContext(CityContext);
//   if (context === undefined)
//     throw new Error("CitiesContext was used outside the CitiesProvider");
//   return context;
// }

CityProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export { CityProvider, CityContext };
