import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteList from "./InfiniteList";
import styled from "styled-components";
import Search from "./Seach/Seach";
import LoadingOverlay from "react-loading-overlay";
import styles from "react-loading-overlay/lib/styles";

const Home = () => {
  const ListContainer = styled.div`
    max-height: ${(props) => (props.scrollable ? "200px" : "auto")};
    max-width: ${(props) => (props.scrollable ? "600px" : "auto")};
    overflow: auto;
  `;

  const { characters, count, functionType, isActive } = useSelector(
    (state) => state.allCharacters
  );

  const { initialCharacters } = useSelector((state) => state.initialCharacters);

  return (
    <>
      <LoadingOverlay
        active={isActive}
        spinner
        text="Loading your content..."
        styles={{
          wrapper: (base) => ({
            ...base,
            position: "absolute",
            display: "block",
            height: "100vh",
            width: "100%",
          }),
        }}
      >
        <Search
          count={count}
          initialCharacters={initialCharacters}
          isActive={isActive}
        />
        {functionType !== "initila" ? (
          <ListContainer>
            <InfiniteList
              characters={characters}
              isActive={isActive}
              count={count}
              functionType={functionType}
            />
          </ListContainer>
        ) : (
          ""
        )}
      </LoadingOverlay>
    </>
  );
};

export default Home;
