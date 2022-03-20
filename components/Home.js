import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteList from "./InfiniteList";
import styled from "styled-components";
import Search from "./Seach/Seach";

const Home = () => {
  const ListContainer = styled.div`
    max-height: ${(props) => (props.scrollable ? "200px" : "auto")};
    max-width: ${(props) => (props.scrollable ? "600px" : "auto")};
    overflow: auto;
  `;

  const { characters, count, functionType } = useSelector(
    (state) => state.allCharacters
  );

  const { initialCharacters } = useSelector((state) => state.initialCharacters);

  return (
    <>
      <Search count={count} initialCharacters={initialCharacters} />
      {functionType !== "initila" ? (
        <ListContainer>
          <InfiniteList
            characters={characters}
            count={count}
            functionType={functionType}
          />
        </ListContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
