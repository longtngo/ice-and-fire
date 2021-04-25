import "./App.css";
import { Layout } from "antd";
import CharacterPage from "./pages/CharacterPage";
import { useRoutes, useRedirect } from "hookrouter";
import HousePage from "./pages/HousePage";
import NotFoundPage from "./pages/NotFoundPage";
import TopNav from "./components/TopNav";

const { Footer, Content } = Layout;

const routes = {
  "/characters": () => <CharacterPage />,
  "/characters/:id": (params) => <CharacterPage id={params?.id} />,
  "/houses": () => <HousePage />,
  "/houses/:id": (params) => <HousePage id={params?.id} />,
};

function App() {
  useRedirect("/", "/characters");
  const routeResult = useRoutes(routes);
  return (
    <Layout>
      <TopNav />
      <Content className="content-container">
        {routeResult || <NotFoundPage />}
      </Content>
      <Footer>Long Ngo - {new Date().getFullYear()}</Footer>
    </Layout>
  );
}

export default App;
