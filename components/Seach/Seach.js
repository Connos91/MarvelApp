import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { searchCharacter } from "../../redux/actions/characterActions";
import styles from "../../styles/Home.module.css";
import Logo from "../../assets/images/Logo..svg";
import Image from "next/image";
import Link from "next/link";

const Search = (props) => {
  const dispatch = useDispatch();
  const classes = `form-control ${styles.search}`;

  const searchHero = (e) => {
    e.preventDefault();

    dispatch({
      type: "IS_SEARCH_ACTIVE",
      isActive: true,
    });
    if (e.target.value === "") {
      dispatch({
        type: "CLEAR_CHARACTERS",
        characters: props.initialCharacters,
        functionType: "refresh",
        isActive: false,
      });

      dispatch({
        type: "IS_SEARCH_ACTIVE",
      });
    } else {
      setTimeout(() => {
        dispatch(searchCharacter(e.target.value));
      }, 1000);
    }
  };

  return (
    <div className={styles.searchHeroContainer}>
      <Link href="/" exact passHref>
        <Image src={Logo} alt="Marvel picture" className={styles.logoImg} />
      </Link>

      <div className="col-auto">
        <input
          type="text"
          id="search"
          autoComplete="off"
          className={classes}
          disabled={props.isActive}
          name="serch"
          placeholder="Search Hero"
          onChange={(e) => searchHero(e)}
        />
      </div>
    </div>
  );
};

export default Search;
