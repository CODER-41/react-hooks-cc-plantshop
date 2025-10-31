import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onUpdatePlant, onDeletePlant }) {
  const plantCards = plants.map((plant) => (
    <PlantCard
      
      key={plant.id} 
      plant={plant}
      onUpdatePlant={onUpdatePlant}
      onDeletePlant={onDeletePlant}
    />
  ));

  return <ul className="cards">{plantCards}</ul>;
}

export default PlantList;
