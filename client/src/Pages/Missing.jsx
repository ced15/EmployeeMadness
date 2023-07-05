import { useEffect, useState } from "react";
import EmployeeTable from "../Components/EmployeeTable/EmployeeTable";

const Missing = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = (employeeId) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee._id === employeeId) {
        return {
          ...employee,
          present: !employee.present,
        };
      }
      return employee;
    });

    setEmployees(updatedEmployees);
  };

  return (
    <div className="Missing">
      {loading ? (
        <div>Loading employees...</div>
      ) : (
        <EmployeeTable
          employees={employees}
          onCheckboxChange={handleCheckboxChange}
        />
      )}
    </div>
  );
};

export default Missing;
