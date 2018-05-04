import React from 'react';
import '@/scss/components/form.scss';

const FormGroup = ({ type, placeholder, label, name, callback, options }) => (
  <div>
    {
      type === 'text' && (
        <div className="form-div">
          <label htmlFor={name}>{label}:</label>
          <input
            className="form-input"
            type="text"
            name={name}
            placeholder={placeholder}
            onChange={callback}
          />
        </div>
      )
    }
    {
      type === 'dropdown' && (
        <div className="form-div">
          <label htmlFor={name}>{label}:</label>
          <select
            name={name}
            id={name}
            onChange={callback}
            placeholder={placeholder}
          >
            <option value="dhsbvsf">Please select one</option>
            {
              options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))
            }
          </select>
        </div>
      )
    }
  </div>
);

export default FormGroup;
