import { wrapper } from "../redux/store/store";
import Home from "../components/Home";
import { getCharacters } from "../redux/actions/characterActions";

export default function Index() {
  return (
    <>
      <Home />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      await store.dispatch(getCharacters(0));
    }
);
