import { useDispatch } from "react-redux";
import { searchCharacter } from "../../redux/actions/characterActions";
import { getCharacters } from "../../redux/actions/characterActions";
import styles from "../../styles/Home.module.css";
import Logo from "../../assets/images/Logo..svg";
import Image from "next/image";
import Link from "next/link";

const Search = (props) => {
  const dispatch = useDispatch();
  const classes = `form-control ${styles.search}`;

  const searchHero = (e) => {
    if (e.target.value === "") {
      dispatch({
        type: "CLEAR_CHARACTERS",
        characters: props.initialCharacters,
        functionType: "refresh",
      });
    } else {
      dispatch(searchCharacter(e.target.value));
    }
    console.log(e.target.value);
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
