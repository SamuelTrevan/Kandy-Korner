import { useEffect, useState } from "react";

export const LocationList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/locations`)
      .then((response) => response.json())
      .then((locationArray) => {
        setLocations(locationArray);
      });
  }, []);

  return (
    <>
      <h2>Kandy Shop Locations</h2>
      <div className="locations">
        {locations.map((location) => {
          return (
            <div key={location.id} className="location">
              <div>{location.locationName}</div>
              <div>{location.address}</div>
              <div>{location.totalSquarFootage} SQ feet</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
