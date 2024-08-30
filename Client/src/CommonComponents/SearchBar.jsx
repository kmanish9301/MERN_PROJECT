import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import "./style.scss";

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      placeholder="Search..."
      value={value}
      onChange={onChange}
      className="searchField"
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
