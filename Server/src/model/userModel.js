import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: 60,
    },
    role: {
      type: String,
      default: "local-user",
    },
    refreshToken: {
      type: String,
    },
    userImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    // collection: 'custom_users_collection' // Specify the custom collection name here
  }
);

//  In MongoDB, the collection name is derived from the model name you provide to mongoose.model().
//  By default, Mongoose converts the model name to lowercase and pluralizes it to create the collection name.
//  For example, if you define a model named User, Mongoose will create a collection named users.

const User = mongoose.model("User", userSchema);

export default User;
