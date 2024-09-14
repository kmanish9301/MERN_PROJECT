import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navLinkData } from "../Constants/constants";
import ToggleMenuIcon from "./Icons/ToggleMenuIcon";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const drawerWidth = open ? 200 : 60;

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
          overflowX: "hidden",
        },
        zIndex: "1",
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ marginTop: "4rem" }}>
        <List sx={{ padding: "0" }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={handleDrawerToggle}
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: "auto",
                  justifyContent: "center",
                }}
              >
                <ToggleMenuIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          {navLinkData?.map(({ id, title, link, icon }) => (
            <ListItem key={id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={link}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={title}
                  sx={{ opacity: open ? 1 : 0, transition: "opacity 0.3s" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
