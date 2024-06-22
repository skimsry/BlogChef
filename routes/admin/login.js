// export default (req, res) => {
//   const { email, password } = req.body;
//   if (email === "homer@springfield.com" && password === "donuts") {
//     req.session.user = "Homer Simpson";
//     return res.redirect("/admin/dashboard");
//   }

//   res.redirect("/admin/login");
// };

import { loginAdmin } from "../../controllers/user.js";
export default async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginAdmin({ email, password });
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      lastLoggedIn: user.lastLoggedIn,
    };

    return res.redirect("/admin/dashboard");
  } catch (error) {
    res.redirect("/admin/login");
  }
};
