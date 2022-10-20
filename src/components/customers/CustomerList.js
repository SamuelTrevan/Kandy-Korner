import { useEffect, useState } from "react";
import { Customer } from "./Customer";
import "./Customers.css";

export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/users?isStaff=false`)
      .then((response) => response.json())
      .then((customerArray) => {
        setCustomers(customerArray);
      });
  }, []);

  return (
    <>
      <div className="customers">
        {customers.map((customer) => (
          <Customer
            key={`customer--${customer.id}`}
            id={customer.id}
            name={customer.name}
            email={customer.email}
          />
        ))}
      </div>
    </>
  );
};
