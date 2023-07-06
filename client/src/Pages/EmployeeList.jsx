import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = ({ employeeList }) => {
  const { search } = useParams();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [presentEmployees, setPresentEmployees] = useState([]);

  const handleCheckboxChange = (employeeId, isChecked) => {
    const updatedPresentEmployees = [...presentEmployees];
    const index = updatedPresentEmployees.indexOf(employeeId);

    fetch(`/api/employees/${employeeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ present: isChecked }),
    })
      .then((response) => response.json())
      .then((updatedEmployee) => {
        // Handle the updated employee data if needed
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });

    if (index === -1) {
      updatedPresentEmployees.push(employeeId);
    } else {
      updatedPresentEmployees.splice(index, 1);
    }

    setPresentEmployees(updatedPresentEmployees);
  };

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });

    setFilteredEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    if (employeeList == null) {
      fetchEmployees().then((employees) => {
        setLoading(false);
        setEmployees(employees);
        setFilteredEmployees(employees);
      });
    } else {
      setLoading(false);
      setEmployees(employeeList);
      setFilteredEmployees(employeeList);
    }
  }, []);

 const getFullName = (employee) => {
   const nameParts = employee.name.split(" ");
   const firstName = nameParts[0];
   const lastName = nameParts[nameParts.length - 1];
   const middleName = nameParts.slice(1, nameParts.length - 1).join(" ");

   return {
     firstName,
     middleName,
     lastName,
   };
 };

  useEffect(() => {
    const filterEmployees = () => {
      let filtered = employees;

      if (searchQuery) {
        filtered = filtered.filter((employee) =>
          employee.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      }

      if (selectedPosition) {
        filtered = filtered.filter(
          (employee) => employee.position === selectedPosition
        );
      }

      if (selectedLevel) {
        filtered = filtered.filter(
          (employee) => employee.level === selectedLevel
        );
      }

      setFilteredEmployees(filtered);
    };

    filterEmployees();
  }, [searchQuery, selectedPosition, selectedLevel, employees]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterPosition = (e) => {
    setSelectedPosition(e.target.value);
  };

  const handleFilterLevel = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortEmployees = () => {
    let sorted = [...filteredEmployees];

    if (
      sortField === "firstName" ||
      sortField === "lastName" ||
      sortField === "middleName"
    ) {
      sorted.sort((a, b) => {
        const nameA = getFullName(a)[sortField].toLowerCase();
        const nameB = getFullName(b)[sortField].toLowerCase();

        if (nameA < nameB) {
          return sortOrder === "asc" ? -1 : 1;
        }

        if (nameA > nameB) {
          return sortOrder === "asc" ? 1 : -1;
        }

        return 0;
      });
    } else if (sortField === "position" || sortField === "level") {
      sorted.sort((a, b) => {
        const fieldA = a[sortField].toLowerCase();
        const fieldB = b[sortField].toLowerCase();

        if (fieldA < fieldB) {
          return sortOrder === "asc" ? -1 : 1;
        }

        if (fieldA > fieldB) {
          return sortOrder === "asc" ? 1 : -1;
        }

        return 0;
      });
    }

    setFilteredEmployees(sorted);
  };

 

  useEffect(() => {
    sortEmployees();
  }, [sortField, sortOrder]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <button onClick={() => handleSort("firstName")}>
          Sort by First Name
        </button>
        <button onClick={() => handleSort("lastName")}>
          Sort by Last Name
        </button>
        <button onClick={() => handleSort("middleName")}>
          Sort by Middle Name
        </button>
        <button onClick={() => handleSort("position")}>Sort by Position</button>
        <button onClick={() => handleSort("level")}>Sort by Level</button>
      </div>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
        />

        <select value={selectedPosition} onChange={handleFilterPosition}>
          <option value="">All Positions</option>
          <option value="Main Actor">Main Actor</option>
          <option value="Comic Relief">Comic Relief</option>
          <option value="Love Interests">Love Interests</option>
          <option value="Protagonist">Protagonist</option>
          <option value="Antagonist">Antagonist</option>
          <option value="Operatour">Operatour</option>
          <option value="Director">Director</option>
          <option value="Joker">Joker</option>
          <option value="Superhero">Superhero</option>
        </select>
        <select value={selectedLevel} onChange={handleFilterLevel}>
          <option value="">All Levels</option>
          <option value="Junior">Junior</option>
          <option value="Medior">Medior</option>
          <option value="Senior">Senior</option>
          <option value="Expert">Expert</option>
          <option value="Godlike">Godlike</option>
        </select>
      </div>
      <EmployeeTable
        search={search ? search : ""}
        employees={filteredEmployees}
        onDelete={handleDelete}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        presentEmployees={presentEmployees}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

export default EmployeeList;
