import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, search }) => {
  return(
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th />
        </tr>
      </thead>
      <tbody>
          {employees.map((employee) => {
            if (employee.name.includes(search)) {
              return (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td>
                    <Link to={`/update/${employee._id}`}>
                      <button type="button">Update</button>
                    </Link>
                    <button type="button" onClick={() => onDelete(employee._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            }
            else { 
              return <></>
            }
          })}
      </tbody>
    </table>
    </div>
  )
};

export default EmployeeTable;
