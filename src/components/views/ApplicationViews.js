import { EmployeeViews } from "./EmployeeViews";
import { CustomerViews } from "./CustomerViews";

export const ApplicationViews = () => {
  const currentUser = localStorage.getItem("kandy_user");
  const kandyUserObj = JSON.parse(currentUser);

  if (kandyUserObj.staff) {
    return <EmployeeViews />;
  } else {
    return <CustomerViews />;
  }
};
