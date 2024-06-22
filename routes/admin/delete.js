import { deleteUser } from "../../controllers/user.js";
export default (req, res) => {
  //   deleteUser(req.session.user.id);
  deleteUser(req.session.user.id);
  res.redirect("/admin/login");
};
