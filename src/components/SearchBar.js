import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import axios from "axios";
import useAuth from "../hooks/useAuth.js";

export default function SearchBar() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    console.log("searchTerm: ", searchTerm);

    if (searchTerm.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      const promisse = await axios.get(
        `${process.env.REACT_APP_BD}/user?search=${searchTerm}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
      setSearchResults(promisse.data);
      console.log("searchResults: ", searchResults);
    } catch (error) {
      setSearchResults([]);
      console.error("Failed to fetch search results", error);
    }
  };

  return (
    <SearchBarContainer>
      <StyledDebounceInput
        data-test="search"
        minLength={3}
        debounceTimeout={300}
        onChange={handleSearch}
        placeholder="Search for people"
      />
      {searchResults.length > 0 ? (
        <SearchResultsList >
          {searchResults.map((result) => (
            <SearchResultItem 
              key={result.id} 
              onClick={() => navigate(`/user/${result.id}`)} >
              <img src={result.pictureUrl} alt={result.name} />
              <p>{result.name}</p>
            </SearchResultItem>
          ))}
        </SearchResultsList>
      ) : ""}
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  min-width: 400px;
`;

const StyledDebounceInput = styled(DebounceInput)`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchResultsList = styled.div`
	width: 100%;
	background-color: white;
	list-style: none;
	padding: 0;
	margin: 0;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SearchResultItem = styled.div`
	display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  gap: 10px;
	padding: 10px;
  border-radius: 8px;
  color: #515151;
	cursor: pointer;
  
	&:hover {
		background-color: #f2f2f2;
    color: black;
	}

  img {
    width: 40px;
    border-radius: 30px;
  }
`;
