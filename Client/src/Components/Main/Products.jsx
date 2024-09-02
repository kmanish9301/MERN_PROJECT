import { Box, Chip } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../CommonComponents/SearchBar";
import SelectComponent from "../../CommonComponents/SelectComponent";
import { fuelTypeOptions, vehicleTypeOptions } from "../../Constants/constants";
import { getAllProductsAction } from "../../store/actions/actions";
import "./style.scss";

const Products = () => {
  const dispatch = useDispatch();
  const { data, loading, success } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectOptions, setSelectOptions] = useState({
    vehicleType: "",
    fuelType: "",
  });

  const loadData = (params = {}) => {
    if (searchTerm !== "") {
      params.search_string = searchTerm;
    }
    if (selectOptions.vehicleType) {
      params.type = selectOptions.vehicleType;
    }
    if (selectOptions.fuelType) {
      params.fuelType = selectOptions.fuelType;
    }
    dispatch(getAllProductsAction(params));
  };

  useEffect(() => {
    loadData();
  }, [selectOptions.vehicleType, selectOptions.fuelType]);

  const debouncedSearch = useCallback(
    debounce((term) => {
      loadData({ search_string: term });
    }, 500),
    [selectOptions] // Dependencies
  );

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleChangeOptions = (e) => {
    const { name, value } = e.target;
    setSelectOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  return (
    <Box className="container">
      <Box className="filterContainer">
        <SearchBar value={searchTerm} onChange={handleChange} />
        <Box className="selectFilters">
          <SelectComponent
            name="vehicleType"
            options={vehicleTypeOptions}
            value={selectOptions?.vehicleType}
            onChange={handleChangeOptions}
            label="Vehicle Type"
            size="small"
          />
          <SelectComponent
            name="fuelType"
            options={fuelTypeOptions}
            value={selectOptions?.fuelType}
            onChange={handleChangeOptions}
            label="Fuel Type"
            size="small"
          />
        </Box>
      </Box>
      <Box className="cardMain">
        {data.length > 0 &&
          data.map((prod) => (
            <Card key={prod.id} className="cardContainer">
              <img src={prod.image} alt={prod.name} className="CardImage" />
              <Typography variant="body2" className="cardTitle">
                {prod.name}
              </Typography>
              <Box className="detailsContainer">
                <Chip label={prod.fuelType} />
                <Chip label={prod.speed} />
                <Chip label={prod.price} />
              </Box>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default Products;
