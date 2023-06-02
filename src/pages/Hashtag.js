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
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth) navigate("/");

    axios
      .get(`http://localhost:5000/posts?hashtag=${hashtag}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  return (
    <PostsPageLayout heading={`#${hashtag}`}>
      {posts.length !== 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <PostLoader />
      )}
    </PostsPageLayout>
  );
}