import express from "express";
import { CreateContactRequest } from "../controller/contactUsController.js";

const route = express.Router();

route.post("/contact_us", CreateContactRequest);

export default route;
