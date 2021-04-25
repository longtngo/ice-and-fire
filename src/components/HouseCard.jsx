import React, { useCallback } from "react";
import { Card, Avatar, Skeleton } from "antd";
import { dispatch } from "use-bus";

const { Meta } = Card;

const HouseCard = ({ data, loading }) => {
  const handleClick = useCallback(() => {
    if (!data) return;

    dispatch({ type: "HOUSE_SELECTED", payload: data?.id });
  }, [data]);

  return (
    <Card style={{ width: 350 }} onClick={handleClick} hoverable>
      <Skeleton loading={loading} avatar active>
        {data && (
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={data.name}
          />
        )}
      </Skeleton>
    </Card>
  );
};

export default HouseCard;
