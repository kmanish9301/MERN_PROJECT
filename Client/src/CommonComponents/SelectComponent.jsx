import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SelectComponent = ({ name, options, value, onChange, label, size }) => {
  return (
    <FormControl fullWidth variant="standard" size={size}>
      <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-select-label`}
        id={`${name}-select`}
        name={name} // Make sure this is set
        value={value}
        onChange={onChange}
        label={label}
      >
        {Object.entries(options).map(([key, displayValue]) => (
          <MenuItem key={key} value={key}>
            {displayValue}
          </MenuItem>
        ))}
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
