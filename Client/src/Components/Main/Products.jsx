import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import debounce from "lodash/debounce";
import defaultImage from "../../assets/bikepng.png";
import SelectComponent from "../../CommonComponents/SelectComponent";
import SearchBar from "../../CommonComponents/SearchBar";
import { fuelTypeOptions, vehicleTypeOptions } from "../../Constants/constants";
import { getAllProductsAction } from "../../store/actions/actions";
import "./style.scss";
import CreateProduct from "./CreateProduct";

const Products = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectOptions, setSelectOptions] = useState({
    vehicleType: "",
    fuelType: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
    [selectOptions]
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
    <>
      <Box
        sx={{
          padding: { xs: 1, sm: 2, md: 3, lg: 4 },
          width: "100%",
        }}
      >
        <Grid container spacing={2} mb={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={"2rem"}
          >
            <SearchBar value={searchTerm} onChange={handleChange} />
            <Button
              variant="outlined"
              color="primary"
              sx={{ borderRadius: "2rem" }}
              onClick={handleOpenModal}
            >
              Create Product
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid
              container
              spacing={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <SelectComponent
                  name="vehicleType"
                  options={vehicleTypeOptions}
                  value={selectOptions.vehicleType}
                  onChange={handleChangeOptions}
                  label="Vehicle Type"
                  size="small"
                  variant={"standard"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <SelectComponent
                  name="fuelType"
                  options={fuelTypeOptions}
                  value={selectOptions.fuelType}
                  onChange={handleChangeOptions}
                  label="Fuel Type"
                  size="small"
                  variant={"standard"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          mb={2}
          mt={5}
          sx={{ display: "flex", gap: "3rem", marginLeft: "0.5rem" }}
        >
          {data.length > 0 &&
            data.map((prod) => (
              <Card key={prod.id} className="cardContainer">
                <img
                  src={prod.image || defaultImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  alt={prod.name}
                  className="CardImage"
                />
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
        </Grid>
      </Box>

      <CreateProduct open={openModal} onClose={handleCloseModal} />
    </>
  );
};

export default Products;
