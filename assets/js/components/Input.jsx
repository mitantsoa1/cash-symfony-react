import React from "react";

const Input = ({
  parentClassName = "",
  label = "",
  labelClassName = "",
  divInputClassName = "",
  type = "text",
  placeholder = "",
  name = "",
  value = "",
  onChange,
  className = "",
  required = "",
}) => {
  return (
    <div className={parentClassName}>
      <label className={labelClassName}>{label}</label>
      <div className={divInputClassName}>
        <input
          required={required}
          type={type}
          placeholder={placeholder}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={className}
        />
      </div>
    </div>
  );
};

export default Input;
