import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "./single.css";
import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
import axios from "axios";
import moment from "moment";
import Menu from "./Menu";
// import DOMPurify from "dompurify";

const getTextHere = (html) => {
  const docs = new DOMParser().parseFromString(html, "text/html");
  return docs.body.textContent;
};

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();

  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`/posts/${postId}`);
        setPost(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <div className="user">
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{getTextHere(post.desc)}</p>
        <img src={`/uploads/${post?.img}`} alt="" />
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
