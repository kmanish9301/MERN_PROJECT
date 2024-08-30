import { Box, Chip } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../CommonComponents/SearchBar";
import { getAllProductsAction } from "../../store/actions/actions";
import "./style.scss";

const Products = () => {
  const dispatch = useDispatch();
  const { data, loading, success } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = () => {
    let params;
    if (searchTerm === "") {
      params = searchTerm;
    }
    dispatch(getAllProductsAction(params));
  };

  useEffect(() => {
    loadData();
  }, []);

  const debouncedSearch = useCallback(
    debounce((term) => {
      dispatch(getAllProductsAction(term));
    }, 500),
    []
  );

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <Box className="container">
      <Box style={{ marginBottom: "4rem", width: "15rem" }}>
        <SearchBar value={searchTerm} onChange={handleChange} />
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
