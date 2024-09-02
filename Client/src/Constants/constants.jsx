import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ROUTES from "../Routes/routes";

export const navLinkData = [
  {
    id: 1001,
    title: "Home",
    link: ROUTES.HOME,
    icon: <HomeIcon />,
  },
  {
    id: 1002,
    title: "About",
    link: ROUTES.ABOUT,
    icon: <InfoIcon />,
  },
  {
    id: 1003,
    title: "Users",
    link: ROUTES.USERS,
    icon: <GroupIcon />,
  },
  {
    id: 1004,
    title: "Products",
    link: ROUTES.PRODUCTS,
    icon: <ShoppingCartIcon />,
  },
  {
    id: 1005,
    title: "Contact",
    link: ROUTES.CONTACT,
    icon: <ContactEmergencyIcon />,
  },
];

export const vehicleTypeOptions = {
  cars: "Cars",
  bikes: "Bikes",
};

export const fuelTypeOptions = {
  petrol: "Petrol",
  diesel: "Diesel",
  ev: "Electric Vehicle",
};
