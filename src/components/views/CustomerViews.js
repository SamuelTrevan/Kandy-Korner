import { Outlet, Route, Routes } from "react-router-dom";
import { LocationList } from "../locations/Locations";
import { FindKandy } from "../products/findKandy";
import { KandyContainer } from "../products/kandyContainer";
import { ProductsList } from "../products/products";

export const CustomerViews = () => {
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
          <Route path="find" element={<KandyContainer />} />
        </Route>
      </Routes>
    </>
  );
};
