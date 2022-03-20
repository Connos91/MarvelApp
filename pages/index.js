import { wrapper } from "../redux/store/store";
import Home from "../components/Home";
import { getCharacters } from "../redux/actions/characterActions";
import { getInitialChar } from "../redux/actions/characterActions";

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
      const allChar = store.dispatch(getCharacters(0));
      const initialChar = store.dispatch(getInitialChar(0));

      await Promise.all([allChar, initialChar]);
    }
);
