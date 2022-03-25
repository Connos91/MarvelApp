import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { searchCharacter } from "../../redux/actions/characterActions";
import styles from "../../styles/Home.module.css";
import Logo from "../../assets/images/Logo..svg";
import Image from "next/image";
import Link from "next/link";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  mergeMap,
} from "rxjs";

import { ALL_CHARACTERS_SEARCH_REQUEST } from "../../redux/constants/characterConstants";

let searcSubject = new BehaviorSubject(""); //pre-set value
let searchResultOnservable = searcSubject.pipe(
  filter((val) => val.length > 1),
  debounceTime(750), //weonly wants to execute this after user stops typing after 750 milliseconds
  distinctUntilChanged(), // Only emit when the current value is different than the last -- we dont want to execute the same call again
  mergeMap((val) => from(searchCharacter(val)))
);

const useObservable = (observable, dispatch) => {
  useEffect(() => {
    let subscription = observable.subscribe((result) => {
      dispatch({
        type: ALL_CHARACTERS_SEARCH_REQUEST,
        payload: result,
        functionType: "search",
        count: 0,
      });
      console.log(result);
    });
    return () => subscription.unsubscribe();
  }, [observable, dispatch]);
};

const Search = (props) => {
  const dispatch = useDispatch();
  const classes = `form-control ${styles.search}`;

  useObservable(searchResultOnservable, dispatch);

  const searchHero = (e) => {
    if (e.target.value === "") {
      dispatch({
        type: "CLEAR_CHARACTERS",
        characters: props.initialCharacters,
        functionType: "refresh",
      });
    } else {
      searcSubject.next(e.target.value);
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
          name="serch"
          placeholder="Search Hero"
          onChange={(e) => searchHero(e)}
        />
      </div>
    </div>
  );
};

export default Search;
