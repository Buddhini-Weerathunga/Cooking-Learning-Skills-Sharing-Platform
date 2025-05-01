import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function View() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:8080/api/items/${id}`)
      .then(() => setItems(items.filter((item) => item.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>All Items</h2>
      <Link to="/create">Create Item</Link>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} <Link to={`/edit/${item.id}`}>Edit</Link>{" "}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default View;
