import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CityContext = createContext();

const BASE_URL = "http://localhost:8000";

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <CityContext.Provider value={{ cities, isLoading }}>
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
