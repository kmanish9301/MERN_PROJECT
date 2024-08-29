import { createTheme } from "@mui/material/styles";

// Define common styles for both themes
const commonStyles = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "2rem",
        },
        h2: {
          fontSize: "1.5rem",
        },
        body1: {
          fontSize: "1rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "8px 0",
          "& .MuiInputBase-root": {
            borderRadius: 4,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          // margin: '8px 0',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.75rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 4,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(2px)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          height: "100% !important",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: "0 16px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          // padding: '16px',
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: "50%",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "#3F3D56",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 4,
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        root: {
          borderRadius: 50,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#4c4c4c !important",
          "&:hover": {
            color: "#323232 !important",
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          overflow: "hidden",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#dcdcdc !important",
        },
      },
    },
  },
};

// Dark Theme
const darkTheme = createTheme({
  ...commonStyles,
  palette: {
    mode: "dark",
    background: {
      default: "#24272f",
      paper: "#1E1E1E",
    },
    primary: {
      main: "#3F3D56",
    },
    secondary: {
      main: "#FF6584",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A0A0A0",
    },
    divider: "#2E2E2E",
    action: {
      active: "#A0A0A0",
      hover: "#2f323b",
      selected: "#3F3D56",
      disabled: "#A0A0A0",
      disabledBackground: "#1E1E1E",
    },
    card: {
      background: "#1E1E1E",
      shadow: "rgba(0, 0, 0, 0.2)",
    },
  },
  components: {
    ...commonStyles.components,
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#3F3D56",
          "&:hover": {
            backgroundColor: "#2f323b",
          },
          color: "#FFFFFF",
        },
        contained: {
          backgroundColor: "#414755",
          "&:hover": {
            backgroundColor: "#2f323b",
          },
          color: "#FFFFFF",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFFFF !important",
        },
        body1: {
          color: "#bcb8b8 !important",
        },
        body2: {
          color: "#bcb8b8 !important",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#125dff !important",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
            color: "#125dff",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#292c33",
          boxShadow: "rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: "100% !important",
          backgroundColor: "#383b42 !important",
          color: "#FFFFFF !important",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "#FFFFFF",
            backgroundColor: "#1E1E1E",
          },
          "& .MuiInputLabel-root": {
            color: "#fff",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#21242c",
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          backgroundColor: "#24272f !important",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#f7f7f7 !important",
          "&:hover": {
            color: "#a6a6a6 !important",
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#3e424a !important",
          color: "#F1F1F1 !important",
        },
        columnHeaders: {
          backgroundColor: "#717277 !important",
        },
        columnHeader: {
          backgroundColor: "#717277 !important",
        },
        footerContainer: {
          backgroundColor: "#717277 !important",
        },
        cell: {
          backgroundColor: "#3e424a !important",
        },
        row: {
          backgroundColor: "#3e424a !important",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#717277 !important",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#4d5056 !important",
        },
      },
    },
  },
});

// Light Theme
const lightTheme = createTheme({
  ...commonStyles,
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF",
      paper: "#F4F4F4",
    },
    primary: {
      main: "#3F3D56",
    },
    secondary: {
      main: "#FF6584",
    },
    text: {
      primary: "#121212",
      secondary: "#757575",
    },
    divider: "#E0E0E0",
    action: {
      active: "#757575",
      hover: "#d2d2d5",
      selected: "#3F3D56",
      disabled: "#757575",
      disabledBackground: "#F4F4F4",
    },
    card: {
      background: "#FFFFFF",
      shadow: "rgba(0, 0, 0, 0.1)",
    },
  },
  components: {
    ...commonStyles.components,
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#000000 !important",
        },
        body1: {
          color: "#6d6c6c !important",
        },
        body2: {
          color: "#4c4c4c !important",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#125dff !important",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
            color: "#125dff",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#3F3D56",
          "&:hover": {
            backgroundColor: "#ababc5",
          },
          color: "#FFFFFF",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          boxShadow: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: "100% !important",
          backgroundColor: "#F1F1F1 !important",
          color: "#000000 !important",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "#121212",
            backgroundColor: "#F4F4F4",
          },
          "& .MuiInputLabel-root": {
            color: "#757575",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#F4F4F4 !important",
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          background: "#F5F5F5 !important",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#4c4c4c !important",
          "&:hover": {
            color: "#323232 !important",
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#3e424a !important",
          color: "#282828 !important",
        },
        columnHeaders: {
          backgroundColor: "#b5b5b5 !important",
        },
        columnHeader: {
          backgroundColor: "#b5b5b5 !important",
        },
        footerContainer: {
          backgroundColor: "#b5b5b5 !important",
        },
        cell: {
          backgroundColor: "#d5d5d5 !important",
        },
        row: {
          backgroundColor: "#d5d5d5 !important",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#d9d9d9 !important",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#dcdcdc !important",
        },
      },
    },
  },
});

export { darkTheme, lightTheme };
