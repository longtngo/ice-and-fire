import { Card, PageHeader, Space } from "antd";
import { navigate } from "hookrouter";
import React from "react";

const cardStyle = {
  width: 300,
  height: 200,
};

const LandingPage = () => {
  return (
    <div>
      <PageHeader title="Landing Page" subTitle="List of available pages" />
      <Space>
        <Card
          hoverable
          style={cardStyle}
          onClick={() => navigate("/characters")}
        >
          <Card.Meta title="Characters" description="List of all characters" />
        </Card>
        <Card hoverable style={cardStyle} onClick={() => navigate("/houses")}>
          <Card.Meta title="Houses" description="List of all houses" />
        </Card>
      </Space>
    </div>
  );
};

export default LandingPage;
