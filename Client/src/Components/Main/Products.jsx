import { Box, Button, Card, Chip, Grid, Typography } from "@mui/material";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../assets/bikepng.png";
import EllipsisOption from "../../CommonComponents/EllipsisOption";
import DeleteIcon from "../../CommonComponents/Icons/DeleteIcon";
import UpdateIcon from "../../CommonComponents/Icons/UpdateIcon";
import SearchBar from "../../CommonComponents/SearchBar";
import SelectComponent from "../../CommonComponents/SelectComponent";
import { fuelTypeOptions, vehicleTypeOptions } from "../../Constants/constants";
import {
  deleteProductAction,
  deleteProductReset,
  getAllProductsAction,
  updateProductAction,
} from "../../store/actions/actions";
import CreateProduct from "./CreateProduct";
import "./style.scss";
import { LoaderComponent } from "../../CommonComponents";

const Products = () => {
  const dispatch = useDispatch();
  const { data, deleteProductSuccess, loading } = useSelector(
    (state) => state.product
  );
  console.log("deleteProductSuccess:", deleteProductSuccess);

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

  const editRecordHandler = (data) => {
    const id = data?.id;
    dispatch(updateProductAction(id));
  };

  const deleteRecordHandler = (data) => {
    const id = data?.id;
    dispatch(deleteProductAction(id));
  };

  useEffect(() => {
    if (deleteProductSuccess) {
      loadData();
      dispatch(deleteProductReset());
    }
  }, [deleteProductSuccess, dispatch]);

  const ellipsisOptions = [
    {
      icon: <UpdateIcon className="qa-edit-btn" />,
      text: "Edit",
      actionFunction: (record) => editRecordHandler(record),
    },
    {
      icon: <DeleteIcon className="qa-delete-btn" />,
      text: "Delete",
      actionFunction: (record) => deleteRecordHandler(record),
    },
  ];

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
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "0rem",
                      right: "0rem",
                      zIndex: 1,
                    }}
                  >
                    <EllipsisOption
                      options={ellipsisOptions}
                      record={prod}
                      className="ellipsisMenu"
                    />
                  </Box>
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
                </Box>
              </Card>
            ))}
        </Grid>
      </Box>

      <CreateProduct
        open={openModal}
        onClose={handleCloseModal}
        onProductCreated={() => loadData()}
      />

      {loading && <LoaderComponent />}
    </>
  );
};

export default Products;
