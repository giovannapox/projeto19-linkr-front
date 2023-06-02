import styled from "styled-components";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import reactStringReplace from "react-string-replace";
import { Link } from "react-router-dom";

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

export default function PostCard({ post }) {
  return (
    <Container>
      <ProfileAndLikesContainer>
        <Link to={`/user/${post.author.id}`}>
          <img
            src={post.author.pictureUrl}
            alt={`${post.author.name} profile picture`}
          />
        </Link>
        <button>
          {post.liked ? <BsHeartFill className="liked" /> : <BsHeart />}
        </button>
      </ProfileAndLikesContainer>
      <PostContent>
        <Link to={`/user/${post.author.id}`}>
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
  gap: 20px;

  & img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 100%;
  }

  & button {
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
