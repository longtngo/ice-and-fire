import "./App.css";
import { Layout } from "antd";
import CharacterPage from "./pages/CharacterPage";
import { useRoutes } from "hookrouter";
import HousePage from "./pages/HousePage";
import NotFoundPage from "./pages/NotFoundPage";
import TopNav from "./components/TopNav";
import LandingPage from "./pages/LandingPage";

const { Footer, Content } = Layout;

const routes = {
  "/characters/:id": (params) => <CharacterPage id={params?.id} />,
  "/characters": () => <CharacterPage />,
  "/houses/:id": (params) => <HousePage id={params?.id} />,
  "/houses": () => <HousePage />,
  "/": () => <LandingPage />,
};

function App() {
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
