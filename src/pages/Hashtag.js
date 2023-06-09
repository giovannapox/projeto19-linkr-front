import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostsPageLayout from "../components/PostsPageLayout.js";
import PostCard from "../components/PostCard.js";
import PostLoader from "../components/PostLoader.js";
import useAuth from "../hooks/useAuth.js";

export default function Hashtag() {
  const navigate = useNavigate();
  const { hashtag } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (!auth) navigate("/");

    axios
      .get(`${process.env.REACT_APP_BD}/posts?hashtag=${hashtag}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response.status === 401) {
          localStorage.clear();
          setAuth(null);
          navigate("/");
        }
      });
  }, [auth, setAuth, hashtag, navigate]);

  return (
    <PostsPageLayout heading={`#${hashtag}`}>
      {isLoading ? (
        <PostLoader />
      ) : posts.length !== 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <span className="no-posts-msg">No posts yet</span>
      )}
    </PostsPageLayout>
  );
}
