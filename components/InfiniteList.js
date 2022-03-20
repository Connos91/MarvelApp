import React, { useState } from "react";
import styled from "styled-components";
import { useInfiniteScroll } from "react-infinite-scroll-hook";
import { useDispatch } from "react-redux";
import { getCharacters } from "../redux/actions/characterActions";
import { getRefreshData } from "../redux/actions/characterActions";
import styles from "../styles/Home.module.css";
import Masonry from "react-masonry-css";
import CharacterItem from "./Characters/CharacterItem";

const List = styled.div`
  list-style: none;
  font-size: 16px;
  margin: 0;
  padding: 6px;
`;

const InfiniteList = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(props.characters);

  const dispatch = useDispatch();

  const handleLoadMore = () => {
    if (props.functionType !== "search") {
      dispatch(getCharacters(props.count));
    } else if (props.functionType === "refresh") {
      setLoading(true);
      dispatch(getInitialChar(0));
    }
  };

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage: true,
    threshold: 100,
    onLoadMore: handleLoadMore,
  });

  const breakpointColumnsObj = {
    default: 8,
    1600: 7,
    1400: 6,
    1200: 5,
    900: 4,
    700: 3,
    500: 1,
  };

  return (
    <List ref={infiniteRef}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {data.map((item) => (
          <div key={item.key} className={styles.character}>
            <CharacterItem key={item.id} character={item} gap="10" />
          </div>
        ))}
      </Masonry>
    </List>
  );
};

export default InfiniteList;
