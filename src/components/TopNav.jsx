import React, { useCallback } from "react";
import { Layout, Menu } from "antd";
import { navigate, usePath } from "hookrouter";

const { Header } = Layout;

const menuItems = [
  { route: "/characters", name: "Characters" },
  { route: "/houses", name: "Houses" },
];

const TopNav = () => {
  const handleClick = useCallback((e) => {
    navigate(e.key);
  }, []);

  const path = usePath();
  const selectedKey = menuItems.find((item) => item.route === path)?.route;

  return (
    <Header>
      <Menu
        onClick={handleClick}
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.route}>{item.name}</Menu.Item>
        ))}
      </Menu>
    </Header>
  );
};

export default TopNav;
