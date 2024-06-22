import { getPost } from "../../controllers/post.js";
import { cacheContent } from "../../controllers/cache.js";
export default async (req, res) => {
  try {
    const id = req.params.postId;
    const post = await getPost(id);
    cacheContent(`post:${id}`, post);
    res.json({ post });
  } catch (error) {
    res.status(404).json(error);
  }
};
