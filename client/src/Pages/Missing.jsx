import { useState, useEffect } from "react";
// import EmployeeTable from "../Components/EmployeeTable";
import EmployeeList from "./EmployeeList";

const Missing = () => {
  const [missingEmployees, setMissingEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/missing")
      .then((response) => response.json())
      .then((data) => {
        setMissingEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching missing employees:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="Missing">
      {loading ? (
        <div>Loading missing employees...</div>
      ) : (
        <EmployeeList employeeList={missingEmployees} />
      )}
    </div>
  );
};

export default Missing;
