import Spinner from "./Spinner.jsx";
import styles from "./CityList.module.css";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import { useContext } from "react";
import { CityContext } from "../contexts/CityContext.jsx";

function CityList() {
  const { cities, isLoading } = useContext(CityContext);
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map " />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
