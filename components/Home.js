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

  return (
    <>
      <Search count={count} />
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
