import { useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, search }) => {
  
  const [presentEmployees, setPresentEmployees] = useState([]);

  const handleCheckboxChange = (employeeId) => {
    const updatedPresentEmployees = [...presentEmployees];
    const index = updatedPresentEmployees.indexOf(employeeId);

    if (index === -1) {
      updatedPresentEmployees.push(employeeId);
    } else {
      updatedPresentEmployees.splice(index, 1);
    }

    setPresentEmployees(updatedPresentEmployees);
  };

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Present</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            if (employee.name.includes(search)) {
              const isChecked = presentEmployees.includes(employee._id);
                console.log(presentEmployees);
              return (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(employee._id)}
                    />
                  </td>
                  <td>
                    <Link to={`/update/${employee._id}`}>
                      <button type="button">Update</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => onDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
