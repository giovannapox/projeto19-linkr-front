import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function TrendingHashtags() {
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/hashtags/trending")
      .then((res) => setHashtags(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <h3>trending</h3>
      <Separator />
      <Hashtags>
        {hashtags.length !== 0 ? (
          hashtags.map((hashtag) => (
            <Link
              key={hashtag.id}
              to={`/hashtag/${hashtag.title}`}
            >{`#${hashtag.title}`}</Link>
          ))
        ) : (
          <span>No hashtags yet</span>
        )}
      </Hashtags>
    </Container>
  );
}

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  padding-block: 10px 30px;
  border-radius: 16px;
  background-color: #171717;

  & h3 {
    margin-left: 15px;
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    font-weight: 700;
    color: white;
  }

  @media (max-width: 1299px) {
    display: none;
  }
`;

const Separator = styled.div`
  height: 1px;
  background-color: #484848;
`;

const Hashtags = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;

  && :is(a, span) {
    font-family: "Lato", sans-serif;
    font-size: 19px;
    font-weight: 700;
    line-height: 1.5;
    color: white;
    text-decoration: none;
  }
`;
