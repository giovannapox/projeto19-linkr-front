import styled from "styled-components";
import Header from "../components/Header.js";
import TrendingHashtags from "../components/TrendingHashtags.js";
import NewPostCard from "../components/NewPostCard.js";

export default function Timeline() {
  return (
    <>
      <Header />
      <PageContainer>
        <h2>timeline</h2>
        <PageContent>
          <PostsContainer>
            <NewPostCard />
          </PostsContainer>
          <TrendingHashtags />
        </PageContent>
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  margin: 50px auto;
  width: 1000px;

  & h2 {
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    font-weight: 700;
    color: white;
  }
`;

const PageContent = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 40px;
`;

const PostsContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
