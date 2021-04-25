import React, { useCallback } from "react";
import { Result, Button } from "antd";
import { navigate } from "hookrouter";

const NotFoundPage = () => {
  const handleClick = useCallback((e) => {
    navigate("/");
  }, []);
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
