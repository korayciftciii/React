import { useEffect, useState } from "react";
import Pizza from "./Pizza";
import useFetch from "../hooks/useFetch";
const config = {
  method: "GET",
}
export default function PizzaList() {
  const { data, loading, error } = useFetch("http://localhost:3000/pizzas", config, []);
  if (loading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
  if (error) {
    return (
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div className="pizza-list">
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
        {
          data.map((pizza) => (
            <Pizza key={pizza.id} pizza={pizza} />
          ))
        }
      </div>
    </div>
  );
}
