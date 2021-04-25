import React from "react";
import { Result, Button } from "antd";
import { setLinkProps } from "hookrouter";

const LinkButton = (props) => <Button {...setLinkProps(props)} />;

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <LinkButton type="primary" href="/">
          Back Home
        </LinkButton>
      }
    />
  );
};

export default NotFoundPage;
