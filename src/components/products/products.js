import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductsList = ({ searchTerms }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProductds] = useState([]);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const currentUser = localStorage.getItem("kandy_user");
  const kandyUserObj = JSON.parse(currentUser);

  useEffect(() => {
    const searchedKandy = products.filter((product) => {
      return product.name.toLowerCase().startsWith(searchTerms.toLowerCase());
    });
    setFilteredProductds(searchedKandy);
  }, [searchTerms]);

  useEffect(() => {
    fetch(`http://localhost:8088/products?_expand=productType`)
      .then((response) => response.json())
      .then((productArray) => {
        setProducts(productArray);
      });
  }, []);

  useEffect(() => {
    setFilteredProductds(products);
  }, [products]);

  useEffect(() => {
    if (toggle) {
      let expensiveProducts = products.filter(
        (product) => product.pricePerUnit >= 2.0
      );
      setFilteredProductds(expensiveProducts);
    } else {
      setFilteredProductds(products);
    }
  }, [toggle]);

  return (
    <>
      <h2>Products</h2>
      {kandyUserObj.staff ? (
        <>
          <button
            onClick={() => {
              setToggle(!toggle);
            }}
            className="fillter_button"
          >
            {toggle ? "All Kandy" : "Top Price"}
          </button>
          {/* <button
            onClick={() => {
              navigate("/create");
            }}
          >
            New Kandy Form
          </button> */}
        </>
      ) : (
        ""
      )}
      <div className="products">
        {filteredProducts.map((product) => {
          return (
            <div key={product.id} className="product">
              <div>{product.name}</div>
              <img src={product.imageURL} alt={product.name} />
              <div>${product.pricePerUnit}</div>
              <div>{product?.productType?.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
