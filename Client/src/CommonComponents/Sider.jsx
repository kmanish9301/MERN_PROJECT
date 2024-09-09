import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { navLinkData } from "../Constants/constants";

const Sidebar = () => {
  const drawerWidth = 200;
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 2,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          zIndex: "1",
        }}
        variant="permanent"
        anchor="left"
      >
        <List
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingLeft: "1rem",
            marginTop: "5rem",
          }}
        >
          {navLinkData?.map(({ id, title, link, icon }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton component={Link} to={link}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
