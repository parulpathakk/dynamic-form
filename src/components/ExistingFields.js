import React from "react";

const ExistingFields = ({ fields, handleRemoveField }) => (
  <div>
    <h3 className="text-medium-1 md:mt-[1.2cqw]">Existing Fields</h3>
    <ul className="md:mt-[1.2cqw]">
      {fields.map((field) => (
        <li key={field.name} className="flex justify-between items-center mb-2 text-medium ">
          <span>{field.label} ({field.type})</span>
          <button
            onClick={() => handleRemoveField(field.name)}
            className=" md:ml-[0.5cqw] error-text"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default ExistingFields;
