import { signUpUser } from "../../controllers/user.js";

export default async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const { user, token } = await signUpUser({ name, email, password });
    res.json({ user, token });
  } catch (error) {
    res.status(403).json(error);
  }
};
