import { loginUser } from "../../controllers/user.js";

export default async (req, res) => {
  try {
    let { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    res.json({ user, token });
  } catch (error) {
    res.status(403).json(error);
  }
};
