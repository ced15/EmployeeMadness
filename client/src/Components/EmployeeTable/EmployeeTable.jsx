import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState, useEffect } from "react";

const EmployeeTable = ({
  employees,
  onDelete,
  search,
  presentEmployees,
  handleCheckboxChange,
}) => {
  const [equipments, setEquip] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("/api/equipment")
      .then((res) => res.json())
      .then((data) => {
        setEquip(data);
      });
  }, []);

  
  const handleSort = () => {
    if (sortOrder === "asc") {
      employees.sort((a, b) => b.name.localeCompare(a.name));
      setSortOrder("desc");
    } else {
      employees.sort((a, b) => a.name.localeCompare(b.name));
      setSortOrder("asc");
    }
  };

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Present</th>
            <th onClick={handleSort}>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Equipment</th>
            <th>Favorite brand</th>
            <th>Favorite colour</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            if (employee.name.includes(search)) {
              const isChecked = presentEmployees.includes(employee._id);
              let equipmentName = "";
              equipments.map((equip) => {
                if (equip._id === employee.equipment) {
                  equipmentName = equip.name;
                }
              });
              return (
                <tr key={employee._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        handleCheckboxChange(employee._id, !isChecked)
                      }
                    />
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td>{equipmentName}</td>
                  <td>{employee.brands.name}</td>
                  <td>{employee.colors.name}</td>

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
