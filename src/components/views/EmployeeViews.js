import { Outlet, Route, Routes } from "react-router-dom";
import { LocationList } from "../locations/Locations";
import { ProductsList } from "../products/products";
import { NewProductForm } from "../products/newProductForm";

export const EmployeeViews = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Kandy Korner Shop</h1>
              <div>Your one-stop-shop to get all your sweets</div>

              <Outlet />
            </>
          }
        >
          <Route path="locations" element={<LocationList />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="create" element={<NewProductForm />} />
        </Route>
      </Routes>
    </>
  );
};
