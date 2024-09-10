import User from "../model/userModel.js";

export const createUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully...!" });
  } catch (error) {
    // Check if the error is a MongoDB duplicate key error
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: true, message: "Email already exists" });
    }
    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ error: true, message: messages });
    }
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { search_string, user_name, email } = req.query;
    // Create a filter object
    let filter = {};
    // If search query parameter is provided, use it to filter by user_name or email
    if (search_string) {
      filter = {
        $or: [
          { user_name: { $regex: search_string, $options: "i" } },
          { email: { $regex: search_string, $options: "i" } },
        ],
      };
    }
    // // Additional specific filters
    // if (user_name) {
    //     filter.user_name = { $regex: user_name, $options: 'i' };
    // }

    // if (email) {
    //     filter.email = { $regex: email, $options: 'i' };
    // }
    const usersData = await User.find(filter);
    if (!usersData.length) {
      return res
        .status(404)
        .json({ error: true, message: "User data not found" });
    }

    //format in which you want to send the data
    const userDetails = usersData.map((user) => ({
      id: user._id,
      user_name: user.user_name,
      email: user.email,
      role: user.role,
      userImage: user.userImage,
    }));

    res.status(200).json({ count: usersData.length, results: userDetails });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = await req.params.id;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res
        .status(404)
        .json({ error: true, message: "User does not exists." });
    }
    res.status(200).json(userExists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("error:", error);
    // Check if the error is a MongoDB duplicate key error
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: true, message: "Email already exists" });
    }
    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ error: true, message: messages });
    }
    res.status(500).json({ error: true, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = await req.params.id;
    const userExists = await User.findByIdAndDelete(id);
    if (!userExists) {
      return res
        .status(404)
        .json({ error: true, message: "User does not exists." });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully...!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
