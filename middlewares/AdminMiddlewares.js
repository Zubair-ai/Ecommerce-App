import user from "../modules/Users.js";

export const isAdmin = async (req, res, next) => {
    const SigninUser=global.signinUser.email;
  try {
    const User = await user.findOne({email:SigninUser}); // access the global variable signinUser
    console.log("User", User)
    if (!User) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }
    if (User.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};
