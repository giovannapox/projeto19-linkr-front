import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import axios from "axios";

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchBarContainer>
      <StyledDebounceInput
        minLength={3}
        debounceTimeout={300}
        onChange={handleSearch}
        placeholder="Search for people"
      />
      {searchResults.length > 0 && (
        <SearchResultsList>
          {searchResults.map((result) => (
            <SearchResultItem key={result.id}>
              {result.name}
            </SearchResultItem>
          ))}
        </SearchResultsList>
      )}
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
	display: flex;
  min-width: 400px;
`;

const SearchResultsList = styled.div`
	display: flex;
	width: 100%;
	background-color: white;
	list-style: none;
	padding: 0;
	margin: 0;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SearchResultItem = styled.div`
	display: flex;
	padding: 10px;
	cursor: pointer;
	&:hover {
		background-color: #f2f2f2;
	}
`;

const StyledDebounceInput = styled(DebounceInput)`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;