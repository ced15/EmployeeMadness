import { useState, useEffect } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [equipments, setEquipments] = useState([]);
  const [equipment, setEquip] = useState(employee?.equipment ?? "");
  const [present, setPresent] = useState(employee?.present ?? false);
  const [brands, setBrand] = useState(employee?.brand ?? "");
  const [allBrands, setAllBrands] = useState([]);
  const [favoriteColor, setFavoriteColor] = useState(employee?.favoriteColor ?? "");
  const [favoriteColors, setFavoriteColors] = useState([]);

  useEffect(() => {
    fetch(`/api/colors`)
      .then((res) => res.json())
      .then((colors) => {
        setFavoriteColors(colors);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/equipment`)
      .then((res) => res.json())
      .then((equipment) => {
        setEquipments(equipment)
      console.log(equipment);});
  }, []);
  
    useEffect(() => {
      fetch(`/api/brands`)
        .then((res) => res.json())
        .then((data) => {
          setAllBrands(data);
         
        });
    }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        equipment,
        favoriteColor,
        brands,
        present,
      });
    }

    return onSave({
      name,
      level,
      position,
      equipment,
      favoriteColor,
      brands,
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
          value={equipment}
          name="equipment"
          onChange={(e) => setEquip(e.target.value)}
        >
          <option value="">Select</option>
          {equipments.map((equip) => (
            <option key={equip._id} value={equip._id}>
              {equip.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="Brands">Favorite Brand:</label>
        <select
          value={brands}
          name="Brands"
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">Select </option>
          {allBrands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="Colors">Favorite Color:</label>
        <select
          value={favoriteColor}
          name="Colors"
          onChange={(e) => setFavoriteColor(e.target.value)}
        >
          <option value="">Select</option>
          {favoriteColors.map((color) => (
            <option key={color._id} value={color._id}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

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
