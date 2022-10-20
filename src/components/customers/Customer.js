import { Link } from "react-router-dom";

export const Customer = ({ id, name, email }) => {
  return (
    <div className="customer">
      <headers>
        <Link to={`/customers/${id}`}> Name: {name} </Link>
      </headers>
      <footer>Email: {email}</footer>
    </div>
  );
};
