import React from "react";
import { Result } from "antd";
import NavButton from "../components/NavButton";

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <NavButton type="primary" href="/">
          Back Home
        </NavButton>
      }
    />
  );
};

export default NotFoundPage;
