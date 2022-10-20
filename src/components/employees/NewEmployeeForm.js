import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewEmployeeForm = () => {
  const [employees, setEmployees] = useState([]);
  const [locations, setLocations] = useState([]);
  const [userChoices, setUserChoices] = useState({
    name: "",
    email: "",
    startDate: "",
    locationId: 0,
    PayRatePerHour: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/employees`)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      });
    fetch(`http://localhost:8088/locations`)
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      });
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    const newUser = {
      name: userChoices.name,
      email: userChoices.email,
      isStaff: true,
    };
    if (
      userChoices.name &&
      userChoices.email &&
      userChoices.startDate &&
      userChoices.locationId &&
      userChoices.PayRatePerHour
    ) {
      return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((response) => {
          const newEmployee = {
            userId: response.id,
            startDate: userChoices.startDate,
            PayRate: userChoices.PayRatePerHour,
            locationId: userChoices.locationId,
          };

          return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee),
          })
            .then((response) => response.json())
            .then(() => navigate("/employees"));
        });
    } else {
      alert("Fill out the entire form please!");
    }
  };

  const handleInputChange = (event) => {
    const copy = { ...userChoices };
    copy[event.target.name] = event.target.value;
    setUserChoices(copy);
  };

  const handleRadioInputChange = (event) => {
    const copy = { ...userChoices };
    copy[event.target.name] = parseInt(event.target.value);
    setUserChoices(copy);
  };

  return (
    <form className="NewEmployeeForm">
      <h2 className="productForm_title">New Employee Form</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            required
            name="name"
            autoFocus
            type="text"
            className="form-control"
            placeholder="John Doe"
            value={userChoices.name}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input
            required
            name="email"
            autoFocus
            type="text"
            className="form-control"
            placeholder="johndoe@gmial.com"
            value={userChoices.email}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Start Date</label>
          <input
            required
            name="startDate"
            autoFocus
            type="date"
            className="form-control"
            placeholder=""
            value={userChoices.startDate}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        {locations.map((location) => {
          return (
            <label htmlFor="name" key={location.id}>
              <input
                required
                name="locationId"
                autoFocus
                type="radio"
                checked={userChoices.locationId === location.id}
                value={location.id}
                onChange={handleRadioInputChange}
              />
              {location.locationName}
            </label>
          );
        })}
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Pay Rate per Hour</label>
          <input
            required
            name="PayRatePerHour"
            autoFocus
            type="text"
            className="form-control"
            value={userChoices.PayRatePerHour}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        Add Employee
      </button>
    </form>
  );
};
