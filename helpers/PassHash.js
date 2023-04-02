import bcrypt from "bcrypt";

const ComparePasswords = (hashedPassword, password) => {
  return bcrypt.compare(password, hashedPassword);
};

export default ComparePasswords;

export const PasswordHash = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log("Failed to accress error");
  }
};
