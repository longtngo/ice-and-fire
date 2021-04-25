import React, { useCallback } from "react";
import { Card, Avatar, Skeleton } from "antd";
import CharacterCardDescription from "./CharacterCardDescription";
import { dispatch } from "use-bus";

const { Meta } = Card;

const CharacterCard = ({ data, loading }) => {
  const handleClick = useCallback(() => {
    if (!data) return;

    dispatch({ type: "CHARACTER_SELECTED", payload: data?.id });
  }, [data]);

  return (
    <Card style={{ width: 350 }} onClick={handleClick} hoverable>
      <Skeleton loading={loading} avatar active>
        {data && (
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={data.name || "Unknown"}
            description={
              <div>
                <CharacterCardDescription
                  values={data.titles}
                  fieldName="Title"
                />
                <CharacterCardDescription
                  values={data.aliases}
                  fieldName="Alias"
                  plural="es"
                />
              </div>
            }
          />
        )}
      </Skeleton>
    </Card>
  );
};

export default CharacterCard;
