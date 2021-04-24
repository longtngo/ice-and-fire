import React, { useCallback } from "react";
import { Card, Avatar, Skeleton } from "antd";
import CharacterCardDescription from "./CharacterCardDescription";
import { dispatch } from "use-bus";

const { Meta } = Card;

const CharacterCard = ({ character, loading }) => {
  const handleClick = useCallback(() => {
    if (!character) return;

    dispatch({ type: "CHARACTER_SELECTED", payload: character?.id });
  }, [character]);

  return (
    <Card style={{ width: 350 }} onClick={handleClick} hoverable>
      <Skeleton loading={loading} avatar active>
        {character && (
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={character.name || "Unknown"}
            description={
              <div>
                <CharacterCardDescription
                  values={character.titles}
                  fieldName="Title"
                />
                <CharacterCardDescription
                  values={character.aliases}
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
