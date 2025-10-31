
import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const { id, name, image, price } = plant;
  const [inStock, setInStock] = useState(true);
  const [newPrice, setNewPrice] = useState(price); 
  const [isEditingPrice, setIsEditingPrice] = useState(false); 

  const handleStockClick = () => {
    setInStock(!inStock);
  };

  const handlePriceUpdate = (e) => {
    e.preventDefault();
    const updatedPrice = parseFloat(newPrice);

    fetch(`http://localhost:6001/plants/${id}`, { 
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: updatedPrice }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onUpdatePlant(updatedPlant); 
        setIsEditingPrice(false); 
      })
      .catch((error) => console.error("Error updating price:", error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${id}`, { 
      method: "DELETE",
    })
      .then(() => {
        onDeletePlant(id); 
      })
      .catch((error) => console.error("Error deleting plant:", error));
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>

      {isEditingPrice ? (
        <form onSubmit={handlePriceUpdate}>
          <input
            type="number"
            step="0.01"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <p>
          {/* Renders as Price: 10 or Price: 15.99 to match test expectation */}
          Price: {price.toString()} 
        </p>
      )}

      {inStock ? (
        <button className="primary" onClick={handleStockClick}>
          In Stock
        </button>
      ) : (
        <button onClick={handleStockClick}>Out of Stock</button>
      )}

      <button onClick={handleDelete} className="delete-button">
        Delete Plant
      </button>
    </li>
  );
}

export default PlantCard;