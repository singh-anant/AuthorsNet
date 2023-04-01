import axios from "axios";
import React, { useEffect, useState } from "react";
import "./single.css";
import { Link } from "react-router-dom";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`/posts/?cat=${cat}`);
        setPosts(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [cat]);
  return (
    <div className="menu">
      <h1>Other post that you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`/uploads/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <Link className="link" to={`/post/${post.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
