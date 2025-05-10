import { useEffect, useState } from "react";
import Pizza from "./Pizza";

export default function PizzaList() {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    async function GetData() {
      const response = await fetch("http://localhost:3000/pizzas");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFetchedData(data);
    }
    GetData()
      .then(() => console.log("Data fetched successfully"))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="pizza-list">
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
        {
          fetchedData.map((pizza) => (
            <Pizza key={pizza.id} pizza={pizza} />
          ))
        }
      </div>
    </div>
  );
}
