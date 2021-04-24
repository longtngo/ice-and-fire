import React from "react";
import { Card, Avatar, Skeleton } from "antd";
import CharacterCardDescription from "./CharacterCardDescription";

const { Meta } = Card;

const CharacterCard = ({ character, onSelect, loading }) => {
  return (
    <Card
      style={{ width: 350 }}
      onClick={() => onSelect?.(character?.id)}
      hoverable
    >
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
