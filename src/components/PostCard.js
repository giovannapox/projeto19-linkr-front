import axios from "axios";
import styled from "styled-components";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import reactStringReplace from "react-string-replace";
import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import useAuth from "../hooks/useAuth.js";

function parseHashtags(caption) {
  const regex = /(?<=^|\s)(?:[#＃]([a-z0-9]+))(?=$|\s)/gi;

  return reactStringReplace(caption, regex, (match, index) => {
    console.log(match);
    return (
      <HashtagLink to={`/hashtag/${match}`} key={index}>
        {`#${match}`}
      </HashtagLink>
    );
  });
}

function getWhoLikedString(liked, likesCount, likedBy) {
  if (likedBy === null && liked) return "Você";
  if (likedBy === null && !liked) return "Ninguém";

  const whoLiked = [];

  if (liked) whoLiked.push("Você");

  if (likedBy) {
    for (const user of likedBy) {
      if (whoLiked.length >= 2) break;
      whoLiked.push(user.name);
    }
  }

  if (whoLiked.length === likesCount) return whoLiked.join(" e ");

  return `${whoLiked.join(", ")} e outras ${
    likesCount - whoLiked.length
  } pessoas`;
}

export default function PostCard({ post }) {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [like, setLike] = useState(post.liked);
  const [likePending, setLikePending] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  console.log(likePending); // só para tirar erro do terminal

  const handleLike = useCallback(() => {
    setLikePending(true);

    const url = `${process.env.REACT_APP_BD}/posts/${post.id}/${
      like ? "unlike" : "like"
    }`;

    axios
      .post(url, {}, { headers: { authorization: `Bearer ${auth.token}` } })
      .then((res) => {
        setLike(!like);
        console.log(res.data);
        setLikesCount(res.data.likesCount);
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 401) {
          localStorage.clear();
          setAuth(null);
          navigate("/");
        }
      })
      .finally(() => {
        setLikePending(false);
      });
  }, [auth, navigate, post.id, setAuth, setLikePending, like, setLike]);

  return (
    <Container>
      <ProfileAndLikesContainer>
        <Link to={`/user/${post.author.id}`}>
          <img
            src={post.author.pictureUrl}
            alt={`${post.author.name} profile`}
          />
        </Link>
        <button onClick={handleLike}>
          {like ? <BsHeartFill className="liked" /> : <BsHeart />}
        </button>
        <span
          data-tooltip-id="likes-tooltip"
          data-tooltip-content={getWhoLikedString(
            like,
            likesCount,
            post.likedBy
          )}
        >{`${likesCount} like${likesCount !== 1 ? "s" : ""}`}</span>
        <Tooltip id="likes-tooltip" place="bottom" />
      </ProfileAndLikesContainer>
      <PostContent>
        <Link to={{
            pathname: `/user/${post.author.id}`,
            state: { authorName: post.author.name, authorImage: post.author.pictureUrl },
          }}>
          <h3>{post.author.name}</h3>
        </Link>
        <p>{parseHashtags(post.caption)}</p>
        <UrlMetadataContainer href={post.url}>
          <UrlMetadata>
            <h4>{post.urlMeta?.title || "No title"}</h4>
            <p>{post.urlMeta?.description || "No description"}</p>
            <span>{post.urlMeta?.url}</span>
          </UrlMetadata>
          <img src={post.urlMeta?.image} alt={post.urlMeta?.title} />
        </UrlMetadataContainer>
      </PostContent>
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  gap: 18px;
  padding: 18px;
  border-radius: 16px;
  background-color: #171717;
`;

const ProfileAndLikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    margin-bottom: 20px;
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 100%;
  }

  & button {
    margin-bottom: 5px;
    padding: 0;
    border: none;
    background-color: transparent;
  }

  & :is(svg, button) {
    width: 20px;
    height: 20px;
    fill: white;
  }

  & svg.liked {
    fill: #ac0000;
  }

  & span {
    font-family: "Lato", sans-serif;
    font-size: 11px;
    color: white;
  }

  & #likes-tooltip {
    font-family: "Lato", sans-serif;
    font-size: 11px;
    font-weight: 700;
    background-color: rgba(255, 255, 255, 0.9);
    color: #505050;
  }
`;

const PostContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: "Lato", sans-serif;
  line-height: 1.5;

  & p {
    color: #b7b7b7;
  }

  & h3 {
    font-size: 20px;
    color: white;
  }
`;

const HashtagLink = styled(Link)`
  font-weight: 700;
  color: white;
`;

const UrlMetadataContainer = styled.a`
  display: flex;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  max-height: 155px;

  & img {
    width: 155px;
    height: 155px;
    object-fit: contain;
  }

  &:visited {
    text-decoration: none;
  }
`;

const UrlMetadata = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;

  & * {
    text-decoration: none;
  }

  & h4 {
    color: #cecece;
    max-height: 1lh;
    overflow: hidden;
  }

  & p {
    flex: 1;
    font-size: 11px;
    color: #9b9595;
    overflow: hidden;
  }

  & span {
    color: #cecece;
    font-size: 11px;
  }
`;
