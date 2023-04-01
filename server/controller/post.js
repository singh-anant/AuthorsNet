const db = require("../model/db");
const jwt = require("jsonwebtoken");

let getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (error, data) => {
    if (error) return res.status(500).send(error);
    // console.log(error);
    return res.status(200).json(data);
  });
};
let getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`,`title`,`desc`,p.img,u.img AS userImg,`cat`,`date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?";
  db.query(q, [req.params.id], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data[0]);
  });
};

// Add a Post from Write Page...
let addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (error) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.json("Post has been created.");
    });
  });
};
let deletePost = (req, res) => {
  //   res.json("Controller");
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, "jwtkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token Is Not Valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (error) => {
      if (error) return res.status(403).json("You can delete only your post!");

      return res.json("Post Has Been Deleted!");
    });
  });
};
let updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, "jwtkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (error) => {
      if (error) return res.status(500).json(error);
      return res.json("Post has been updated.");
    });
  });
};

module.exports = { getPosts, getPost, addPost, deletePost, updatePost };
