import { useEffect, useState } from "react";
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

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

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
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
        setFilteredEmployees(employees);
      });
  }, []);

  useEffect(() => {
    const filterEmployees = () => {
      let filtered = employees;

      if (searchQuery) {
        filtered = filtered.filter((employee) =>
          employee.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
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
      <EmployeeTable employees={filteredEmployees} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeList;
