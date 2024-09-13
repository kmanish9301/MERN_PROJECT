import AboutIcon from "../CommonComponents/Icons/AboutIcon";
import ContactIcon from "../CommonComponents/Icons/ContactIcon";
import GroupIcon from "../CommonComponents/Icons/GroupIcon";
import HomeIcon from "../CommonComponents/Icons/HomeIcon";
import VehicleIcon from "../CommonComponents/Icons/ShoppingCartIcon";
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
    icon: <AboutIcon />,
  },
  {
    id: 1003,
    title: "Users",
    link: ROUTES.USERS,
    icon: <GroupIcon />,
  },
  {
    id: 1004,
    title: "Vehicles",
    link: ROUTES.PRODUCTS,
    icon: <VehicleIcon />,
  },
  {
    id: 1005,
    title: "Contact",
    link: ROUTES.CONTACT,
    icon: <ContactIcon />,
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
