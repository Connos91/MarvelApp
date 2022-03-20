import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const CharacterItem = ({ character }) => {
  const GraphCMSImageLoader = ({ src }) => {
    const relativeSrc = (src) => src.split(".us/").pop();
    return `http://i.annihil.us/${relativeSrc(src)}`;
  };

  return (
    <>
      <Link as={`/character/${character.id}`} href={`/character/[id]`} passHref>
        <Image
          loader={GraphCMSImageLoader}
          src={`/${
            character.thumbnail.path + "." + character.thumbnail.extension
          }`}
          alt="Landscape picture"
          width={300}
          height={300}
          layout="responsive"
        ></Image>
      </Link>
      <div className="card-body" style={{ background: "white" }}>
        <h5 className="card-title">
          <Link
            as={`/character/${character.id}`}
            href={`/character/[id]`}
            passHref
          >
            <a className={styles.heroTitle}>
              <div className={styles.cardContent}>
                <span
                  style={{
                    fontWeight: 700,
                  }}
                >
                  Hero Name:{" "}
                </span>{" "}
                <span>{character.name}</span>
              </div>
            </a>
          </Link>
        </h5>
        <div className="card-text">
          {character.description === "" ? (
            ""
          ) : (
            <>
              <Link
                as={`/character/${character.id}`}
                href={`/character/[id]`}
                passHref
              >
                <a className={styles.description}>
                  <div className={styles.cardContent}>
                    <span style={{ fontWeight: 700 }}>Description: </span>
                    <span>{character.description}</span>
                  </div>
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CharacterItem;
