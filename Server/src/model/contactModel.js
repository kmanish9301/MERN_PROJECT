import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    subject: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ContactUs = mongoose.model("Contact", contactUsSchema);

export default ContactUs;
