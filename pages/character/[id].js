import CharacterDetails from "../../components/Characters/CharacterDetails";
import { getCharacterDetails } from "../../redux/actions/characterActions";
import { getCharacterChilds } from "../../redux/actions/characterActions";
import { wrapper } from "../../redux/store/store";
import styles from "../../styles/Home.module.css";
import Layout from "antd/lib/layout/layout";
export default function CharacterDetailsPage() {
  return (
    <>
      <CharacterDetails title="Character Details" />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const reqDet = store.dispatch(getCharacterDetails(req, params.id));
      const reqComics = store.dispatch(
        getCharacterChilds("linkCharComics", params.id)
      );
      const reqStories = store.dispatch(
        getCharacterChilds("linkCharStories", params.id)
      );

      const reqEvents = store.dispatch(
        getCharacterChilds("linkCharEvents", params.id)
      );

      const reqSeries = store.dispatch(
        getCharacterChilds("linkCharSeries", params.id)
      );

      await Promise.all([reqDet, reqComics, reqStories, reqEvents, reqSeries]);
    }
);
