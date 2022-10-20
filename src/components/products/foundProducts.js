import { useEffect, useState } from "react";

export const FoundProducts = ({ searchTerms }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProductds] = useState([]);

  useEffect(() => {
    const searchedKandy = products.filter((product) => {
      if (
        product.name.toLowerCase().startsWith(searchTerms.toLowerCase()) &&
        searchTerms.replace(" ", "") !== ""
      ) {
        return true;
      }
    });
    setFilteredProductds(searchedKandy);
  }, [searchTerms]);

  useEffect(() => {
    fetch(`http://localhost:8088/products`)
      .then((response) => response.json())
      .then((productArray) => {
        setProducts(productArray);
      });
  }, []);

  return (
    <>
      <h2>Products</h2>

      <div className="products">
        {filteredProducts.map((product) => {
          return (
            <div key={product.id} className="product">
              <div>{product.name}</div>
              <img src={product.imageURL} alt={product.name} />
              <div>${product.pricePerUnit}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
