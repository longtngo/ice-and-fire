import "./App.css";
import { Layout, Menu } from "antd";
import CharacterPage from "./pages/CharacterPage";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Characters</Menu.Item>
          <Menu.Item key="2">Houses</Menu.Item>
        </Menu>
      </Header>
      <Content className="content-container">
        <CharacterPage />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
