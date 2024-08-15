import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { darkTheme, lightTheme } from "./CommonComponents/theme";
import ToastNotification from "./CommonComponents/ToastNotification";
import AppRoute from "./Routes/AppRoute";

function App() {
  const themeMode = useSelector((state) => state.theme.palette.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
      <ToastNotification />
    </ThemeProvider>
  );
}

export default App;
