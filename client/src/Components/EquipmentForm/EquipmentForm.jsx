import { useState, useEffect } from "react";

const EquipmentForm = ({ onSave, disabled, equipment, onCancel }) => {
  const [name, setName] = useState(equipment?.name ?? "");
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(equipment?.type ?? "");
  const [amount, setAmount] = useState(equipment?.amount ?? "");


    useEffect(() => {
      fetch(`/api/types`)
        .then((res) => res.json())
        .then((types) => {
          setTypes(types);
        });
    }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (equipment) {
      return onSave({
        ...equipment,
        name,
        type,
        amount,
      });
    }

    return onSave({
      name,
      type,
      amount,
    });
  };

  return (
    <form className="EquipmentForm" onSubmit={onSubmit}>
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
        <label htmlFor="type">Type:</label>
        <select
          value={type}
          name="type"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select</option>
          {types.map((type) => (
            <option key={type._id} value={type._id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="amount">Amount:</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          name="amount"
          id="amount"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {equipment ? "Update Equipment" : "Create Equipment"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;
