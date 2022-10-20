import { useEffect, useState } from "react";
import "./Employees.css";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
      .then((response) => response.json())
      .then((employeeArray) => {
        setEmployees(employeeArray);
      });
  }, []);

  return (
    <>
      <h2>Products</h2>
      <div className="empolyees">
        {employees.map((employee) => {
          return (
            <div key={employee.id} className="employee">
              <headers className="employee-header">
                Name: {employee?.user?.name}
              </headers>
              <div>Email: {employee?.user?.email}</div>
              <div>Location: {employee?.location?.locationName}</div>
              <div>Start Date: {employee.startDate}</div>
              <div>Pay Rate: {employee.payRate}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
