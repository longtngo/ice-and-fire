import React from "react";
import { Layout, Menu } from "antd";
import { A, usePath } from "hookrouter";

const { Header } = Layout;

const menuItems = [
  { route: "/", name: "Home" },
  { route: "/characters", name: "Characters" },
  { route: "/houses", name: "Houses" },
];

const TopNav = () => {
  const path = usePath();
  const selectedKey = menuItems.find((item) => item.route === path)?.route;

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]}>
        {menuItems.map((item) => (
          <Menu.Item key={item.route}>
            <A href={item.route}>{item.name}</A>
          </Menu.Item>
        ))}
      </Menu>
    </Header>
  );
};

export default TopNav;
