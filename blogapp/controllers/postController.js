const Post = require("../models/postModel");
exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });
    const savedPost = await post.save();
    res.json({
      post: savedPost,
    });
  } catch (error) {
    return res.status(404).json({
      error: "Error while creating post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({}).populate("comments").populate('likes').exec();
    res.status(200).json({
      success: true,
      data: allPosts,
      message: "All posts are successfully fetched"
    });
  } catch (error) {
    res.status(400).json({
        success: false,
        message: error.message
    });
  }
};
