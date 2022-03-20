/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image";
import Masonry from "react-masonry-css";
import styles from "../../styles/Home.module.css";
import _ from "lodash";

const CharacterChilds = (props) => {
  const GraphCMSImageLoader = ({ src }) => {
    const relativeSrc = (src) => src.split(".us/").pop();
    return `http://i.annihil.us/${relativeSrc(src)}`;
  };

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
    <>
      {props.data.length > 0 ? (
        <div>
          <div className={styles.conTitle}>{props.data[0].contentTitle}</div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.masonryGrid}
            columnClassName={styles.masonryGridColumn}
          >
            {props.data.map((com) => {
              return (
                <div key={com.id}>
                  {_.isNull(com.thumbnail) ? (
                    <div className={styles.seriesTitle}>{com.title}</div>
                  ) : (
                    <Image
                      loader={GraphCMSImageLoader}
                      src={`/${
                        com.thumbnail.path + "." + com.thumbnail.extension
                      }`}
                      alt="Landscape picture"
                      width={400}
                      height={400}
                      layout="intrinsic"
                    />
                  )}
                </div>
              );
            })}
          </Masonry>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CharacterChilds;
