import React from 'react';

const SelectListGroup = ({ name, value, onChange, options, input }) => {
  const selectOptions = options.map(option => (
    <option key={option} value={option}>
      {option}
    </option>

  ));
  return (
    <div className="form-group">
      <select
        className='form-control'
        {...input}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
    </div>
  );
};

export default SelectListGroup;