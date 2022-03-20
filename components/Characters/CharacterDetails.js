/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import CharacterChilds from "./CharacterChilds";
import _ from "lodash";
import styles from "../../styles/Home.module.css";

const CharacterDetails = () => {
  const { character } = useSelector((state) => state.cheracterDetails);
  const { comicsData, eventsData, storiesData, seriesData } = useSelector(
    (state) => state.allCharacterChilds
  );

  const childs = _.filter(
    [comicsData, eventsData, storiesData, seriesData],
    _.size
  );

  console.log(childs);

  const GraphCMSImageLoader = ({ src }) => {
    const relativeSrc = (src) => src.split(".us/").pop();
    return `http://i.annihil.us/${relativeSrc(src)}`;
  };

  return (
    <>
      <Head>
        <title>{character.name} - Marvel</title>
      </Head>

      <Link as="/" href="/" exact passHref>
        <a className={styles.backHome}>Back to Home</a>
      </Link>
      <div className="container">
        <div className="text-center">
          <h2 className={styles.avatarTitle}>{character.name}</h2>
          <Image
            loader={GraphCMSImageLoader}
            className="d-block m-auto"
            src={`/${
              character.thumbnail.path + "." + character.thumbnail.extension
            }`}
            alt={character.name}
            width={300}
            height={300}
          />
        </div>

        {childs.length > 0
          ? childs?.map((item, index) => {
              return <CharacterChilds key={index} data={item} />;
            })
          : ""}
      </div>
    </>
  );
};

export default CharacterDetails;
