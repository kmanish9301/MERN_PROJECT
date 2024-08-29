import { Box, Chip } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../../store/actions/actions";
import "./style.scss";

const Products = () => {
  const dispatch = useDispatch();
  const { data, loading, success } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  return (
    <Box className="cardMain">
      {data.length > 0 &&
        data.map((prod) => {
          console.log("prod:", prod);
          return (
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
          );
        })}
    </Box>
  );
};

export default Products;
