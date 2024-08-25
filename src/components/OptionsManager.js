import React from "react";

const OptionsManager = ({
  type,
  options,
  handleOptionChange,
  handleRemoveOption,
  handleAddOption,
}) => (
  <div>
    <label className="label-text">Options:</label>
    {options.map((option, index) => (
      <div key={index} className="flex items-center mb-2">
        <input
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(type, index, e.target.value)}
          className="input-field mr-2"
        />
        <button
          onClick={() => handleRemoveOption(type, index)}
          className="error-text"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      onClick={handleAddOption}
      className="label-text mt-[1.2cqw] md:mt-[0.8cqw] bg-gradient-to-t from-[#ec9938] to-[#facb4b] !text-black py-[2cqw] px-[3cqw] md:py-[0.6cqw] md:px-[1cqw] rounded-full hover:transition-all duration-700"
    >
      Add Option
    </button>
  </div>
);

export default OptionsManager;
