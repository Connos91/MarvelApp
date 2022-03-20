import React from "react";
import Image from "next/image";
import Link from "next/link";

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
            <a style={{ textAlign: "right", textDecoration: "none" }}>
              <span style={{ fontWeight: 700 }}>Hero Name: </span>{" "}
              {character.name}
            </a>
          </Link>
        </h5>
        <div className="card-text">
          {character.description === "" ? (
            ""
          ) : (
            <>
              <span style={{ fontWeight: 700 }}>Description: </span>{" "}
              {character.description}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CharacterItem;
