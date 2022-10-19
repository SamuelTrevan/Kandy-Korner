import { Link, useNavigate } from "react-router-dom";
import { CustomerNav } from "./CustomerNav";
import { EmployeeNav } from "./EmployeeNav";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("kandy_user");
  const kandyUserObj = JSON.parse(currentUser);

  if (kandyUserObj.staff) {
    return <EmployeeNav />;
  } else {
    return <CustomerNav />;
  }
};
