import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewProductForm = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [userChoices, setUserChoices] = useState({
    name: "",
    imageURL: "",
    productTypeId: 0,
    pricePerUnit: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/productTypes`)
      .then((response) => response.json())
      .then((data) => {
        setProductTypes(data);
      });
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    const newProduct = {
      name: userChoices.name,
      imageURL: userChoices.imageURL,
      productTypeId: userChoices.productTypeId,
      pricePerUnit: userChoices.pricePerUnit,
    };
    if (
      userChoices.name &&
      userChoices.imageURL &&
      userChoices.productTypeId &&
      userChoices.pricePerUnit
    ) {
      return fetch("http://localhost:8088/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then(() => navigate("/products"));
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
    <form className="newProductForm">
      <h2 className="productForm_title">New Kandy Product</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Kandy Name</label>
          <input
            required
            name="name"
            autoFocus
            type="text"
            className="form-control"
            placeholder="New product name"
            value={userChoices.name}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Kandy Image</label>
          <input
            required
            name="imageURL"
            autoFocus
            type="text"
            className="form-control"
            placeholder="example.com"
            value={userChoices.imageURL}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        {productTypes.map((type) => {
          return (
            <label htmlFor="name" key={type.id}>
              <input
                required
                name="productTypeId"
                autoFocus
                type="radio"
                checked={userChoices.productTypeId === type.id}
                value={type.id}
                onChange={handleRadioInputChange}
              />
              {type.name}
            </label>
          );
        })}
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Kandy Price</label>
          <input
            required
            name="pricePerUnit"
            autoFocus
            type="text"
            className="form-control"
            value={userChoices.pricePerUnit}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        Add New Kandy
      </button>
    </form>
  );
};
