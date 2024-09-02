import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer, Header } from "../Components/Main";
import Sider from "./Sider";
import { isAuthenticated } from "./utils";

const LayoutView = ({ children }) => {
  const [showLayout, setShowLayout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      setShowLayout(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!showLayout) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sider />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flexGrow: 1, padding: "24px" }}>{children}</Box>
          <Divider sx={{ background: "#E5E4E2" }} />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutView;
