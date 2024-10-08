import { yupResolver } from "@hookform/resolvers/yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import defaultImage from "../../assets/bikepng.png";
import { LoaderComponent } from "../../CommonComponents";
import SelectComponent from "../../CommonComponents/SelectComponent";
import { fuelTypeOptions, vehicleTypeOptions } from "../../Constants/constants";
import {
  createProductAction,
  createProductReset,
  updateProductAction,
  updateProductReset,
} from "../../store/actions/actions";

const CreateProduct = ({ open, onClose, onProductCreated, productUpdate }) => {
  const dispatch = useDispatch();

  const { success, loading, updateProductSuccess } = useSelector(
    (state) => state.product
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const schema = yup
    .object({
      type: yup.string().required("Type is required"),
      name: yup.string().required("Name is required"),
    })
    .required();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "",
      name: "",
      brand: "",
      speed: "",
      fuelType: "",
      price: "",
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  // Prefill form in update mode
  useEffect(() => {
    if (productUpdate && open) {
      reset({
        type: productUpdate?.type || "",
        name: productUpdate?.name || "",
        brand: productUpdate?.brand || "",
        speed: productUpdate?.speed || "",
        fuelType: productUpdate?.fuelType || "",
        price: productUpdate?.price || "",
      });
      setSelectedFile(null);
    }
  }, [productUpdate, open, reset]);

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleProductAction = (data) => {
    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("speed", data.speed);
    formData.append("fuelType", data.fuelType);
    formData.append("price", data.price);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (productUpdate?.id) {
      dispatch(updateProductAction({ id: productUpdate?.id, formData }));
    } else {
      dispatch(createProductAction(formData));
    }
  };

  useEffect(() => {
    if (open) {
      reset();
      setSelectedFile(null);
    }
  }, [open, reset]);

  useEffect(() => {
    if (success || updateProductSuccess) {
      onProductCreated();
      onClose();
    }
    return () => {
      dispatch(createProductReset());
      dispatch(updateProductReset());
    };
  }, [success, updateProductSuccess]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: "50%",
            maxWidth: "500px",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <Typography variant="h6" component="h2">
            {productUpdate?.id ? "Update Product" : "Create Product"}
          </Typography>

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(handleProductAction)}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 150,
                  height: 120,
                  margin: "0 auto",
                }}
              >
                <Avatar
                  alt="Product"
                  variant="square"
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : productUpdate?.image || defaultImage
                  }
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "0.6rem !important",
                    boxShadow:
                      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: -10,
                    right: -10,
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "white" },
                    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
                    borderRadius: "5rem",
                  }}
                  onClick={() => fileInputRef.current.click()}
                >
                  <CloudUploadIcon
                    sx={{
                      fontSize: "1rem",
                      color: "grey",
                    }}
                  />
                </IconButton>
              </Box>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <SelectComponent
                    name="type"
                    options={vehicleTypeOptions}
                    value={watch("type")}
                    onChange={(e) => setValue("type", e.target.value)}
                    label="Vehicle Type"
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...methods.register("name")}
                    label="Name of Vehicle"
                    type="text"
                    size="small"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...methods.register("brand")}
                    label="Brand Name"
                    type="text"
                    size="small"
                    fullWidth
                    error={!!errors.brand}
                    helperText={errors.brand?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...methods.register("speed")}
                    label="Speed"
                    type="text"
                    size="small"
                    fullWidth
                    error={!!errors.speed}
                    helperText={errors.speed?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SelectComponent
                    name="fuelType"
                    options={fuelTypeOptions}
                    value={watch("fuelType")}
                    onChange={(e) => setValue("fuelType", e.target.value)}
                    label="Fuel Type"
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...methods.register("price")}
                    label="Price"
                    type="text"
                    size="small"
                    fullWidth
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                size="medium"
                sx={{ width: "100%", marginTop: "1rem" }}
                type="submit"
              >
                {productUpdate?.id ? "Update Product" : "Create Product"}
              </Button>
            </form>
          </FormProvider>
        </Card>
      </Modal>
      {loading && <LoaderComponent />}
    </>
  );
};

export default CreateProduct;
