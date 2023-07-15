import { useState, useEffect } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [equipments, setEquipments] = useState([]);
  const [present, setPresent] = useState(employee?.present ?? false);
  const [equipment, setEquip] = useState(employee?.equipment ?? {});
  const [brands, setBrand] = useState(employee?.brand ?? "");
  const [allBrands, setAllBrands] = useState([]);




  useEffect(() => {
    fetch(`/api/equipment`)
      .then((res) => res.json())
      .then((equipment) => {
        setEquipments(equipment)
      console.log(equipment);});
  }, []);
  
    // useEffect(() => {
    //   fetch(`/api/brands`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setAllBrands(data);
    //       console.log(allBrands);
    //     });
    // }, []);

// console.log(brands)

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      console.log(employee);
      return onSave({
        ...employee,
        name,
        level,
        position,
        equipment,
        // brands,
        present,
      });
    }

    return onSave({
      name,
      level,
      position,
      equipment,
      // brands,
      present,
    });
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <select
          value={employee?.equipment}
          name="equipment"
          onChange={(e) => {
            equipments.map((equip) => {
              if (e.target.value === equip.name) {
                console.log(equip);
                setEquip(equip._id);
              }
            });
            // setEquip(e.target.value)
          }}
        >
          {equipments?.map((equip) => {
            return <option> {equip.name} </option>;
          })}
        </select>
      </div>

      {/* <div className="control">
        <label htmlFor="brand">Favourite Brands:</label>

        <select
          value={employee?.brands.name}
          name="brand"
          onChange={(e) => {
            allBrands.map((brand) => {
              if (e.target.value === brand.name) {
                console.log(brand);
                setBrand(brand._id);
              }
            });
            // setEquip(e.target.value)
          }}
        >
          {allBrands?.map((brand) => {
            return <option> {brand.name} </option>;
          })}
        </select>
        { <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          name="brand"
          id="brand"
        /> }
      </div> */}

      <div className="control">
        <label htmlFor="present">Present:</label>
        <input
          type="checkbox"
          checked={present}
          onChange={(e) => setPresent(e.target.checked)}
          name="present"
          id="present"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
