import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Box, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoaderComponent } from "../../CommonComponents";
import nodesImage from "../../assets/nodes.png";
import { loginReset, toggleThemeAction } from "../../store/actions/actions";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.palette.mode);
  const { loginDetails } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(loginReset());
    setLoading(true);
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  const handleThemeToggle = () => {
    const newMode = themeMode === "light" ? "dark" : "light";
    dispatch(toggleThemeAction(newMode));
    localStorage.setItem("themeMode", newMode);
  };

  const userName = (loginDetails?.data?.userData?.userName ?? "local-user")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "#fff",
          color: "#000",
          height: "4rem !important",
          zIndex: "11",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box
              sx={{
                padding: "1.5rem 2.4rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <img
                src={nodesImage}
                loading="eager|lazy"
                style={{ height: "2rem", width: "2rem" }}
              />
              <Typography variant="h5" mt={"10px"}>
                User Port
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginRight: "1rem",
              }}
            >
              {themeMode === "light" ? (
                <DarkModeIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleThemeToggle}
                />
              ) : (
                <LightModeIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleThemeToggle}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.8rem",
                  marginTop: "0rem",
                }}
              >
                <Avatar
                  sx={{ width: "2rem", height: "2rem", cursor: "pointer" }}
                />
                <Typography variant="body1" color="initial">
                  {userName}
                </Typography>
              </Box>
              <LogoutIcon
                sx={{ color: "#525252", cursor: "pointer" }}
                onClick={handleLogout}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {loading && <LoaderComponent />}
    </>
  );
};

export default Header;
