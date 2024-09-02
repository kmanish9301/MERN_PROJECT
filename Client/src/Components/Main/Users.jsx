import { Box, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAction, getAllUserReset } from "../../store/actions/actions";
import LoaderComponent from "./../../CommonComponents/LoaderComponent";

const Users = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user || "");

  const columns = [
    {
      field: "id",
      headerName: "ID",
      maxWidth: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "user_name",
      headerName: "User name",
      width: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      width: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  const handlefetchUsers = () => {
    dispatch(getAllUserAction());
  };
  useEffect(() => {
    handlefetchUsers();
    return () => {
      dispatch(getAllUserReset());
    };
  }, []);

  return (
    <Grid style={{ height: 400, width: "100%" }}>
      <Typography variant="h5" mb={2} color="initial">
        Users
      </Typography>
      <DataGrid
        rows={data || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        autoHeight={true}
        disableColumnSorting
        columnMenuColumnsItem
        disableColumnMenu={true}
        // checkboxSelection
        sx={{
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
        }}
      />
      {loading && <LoaderComponent />}
    </Grid>
  );
};

export default Users;
