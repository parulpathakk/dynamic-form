import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles

const UserForm = ({ fields }) => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validatePhoneNumber = (value) => /^\+91\d{10}$/.test(value);
  const validateGeneralNumber = (value) => /^\d+$/.test(value);
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    fields.forEach((field) => {
      if (field.required && !formState[field.name]) {
        newErrors[field.name] = "This field is required.";
        isValid = false;
      }
      if (field.type === "number") {
        if (field.subtype === "phone" && !validatePhoneNumber(formState[field.name])) {
          newErrors[field.name] = "Invalid phone number format. Use +91 followed by 10 digits.";
          isValid = false;
        }
        if (field.subtype === "general" && !validateGeneralNumber(formState[field.name])) {
          newErrors[field.name] = "Invalid number format.";
          isValid = false;
        }
      }
      if (field.type === "email" && !validateEmail(formState[field.name])) {
        newErrors[field.name] = "Invalid email format.";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;

    if (type === 'checkbox') {
      setFormState((prevState) => {
        const currentValues = prevState[name] || [];
        if (checked) {
          return { ...prevState, [name]: [...currentValues, value] };
        } else {
          return { ...prevState, [name]: currentValues.filter((val) => val !== value) };
        }
      });
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Submitted Data:", formState); 
      setSubmitted(true);
      toast.success('Form submitted successfully!'); 
      setFormState({});
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <h2 className="text-big">User Form</h2>
      <div className="w-[90%] md:w-[45%] mx-auto bg-[#181724] rounded-[1cqw] border-[0.05cqw] border-opacity-40 border-gray-300 px-[6cqw] py-[4cqw] md:px-[2cqw] md:py-[1.8cqw] mt-[8cqw] md:mt-[1cqw]">
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <div className="flex justify-between items-center w-full">
                <label className="label-text">
                  {field.label}:
                </label>
                <div> {field.required && <span className="error-text">* Required</span>}</div>
              </div>
              {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
                <input
                  type={field.type}
                  name={field.name}
                  value={formState[field.name] || ''}
                  onChange={handleChange}
                  className="input-field"
                />
              ) : field.type === 'checkbox' ? (
                <div>
                  {(field.options || []).map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name={field.name}
                        value={option.value}
                        checked={formState[field.name] && formState[field.name].includes(option.value)}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-400">{option.label}</span>
                    </div>
                  ))}
                </div>
              ) : field.type === 'radio' ? (
                <div>
                  {(field.options || []).map((option, index) => (
                    <div key={index} className="flex items-center mb-[3cqw] md:mb-[1cqw]">
                      <input
                        type="radio"
                        name={field.name}
                        value={option.value}
                        checked={formState[field.name] === option.value}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded mt-[1.2cqw] md:mt-[0.5cqw]"
                      />
                      <span className="label-text ml-[2cqw] md:ml-[1cqw] mt-[1.2cqw] md:mt-[0.5cqw]">{option.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              {errors[field.name] && <p className="error-text md:mt-[0.3cqw] !text-red-500">{errors[field.name]}</p>}
            </div>
          ))}
          <button
            type="submit"
            className={`btn-small ${submitted ? 'btn-disabled' : ''}`}
            disabled={submitted}
          >
            {submitted ? 'Submitted' : 'Submit'}
          </button>
        </form>
      </div>
      <ToastContainer /> 
    </section>
  );
};

export default UserForm;
