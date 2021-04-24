import React from "react";
import { getCharacterById } from "../services/characterApi";
import { Card, Descriptions, Skeleton, Avatar } from "antd";
import CharacterLink from "./CharacterLink";
import HouseLink from "./HouseLink";
import useFetch from "../hooks/useFetch";
import { renderArray } from "./shared/helper";

const { Meta } = Card;

const CharacterDetail = ({ id }) => {
  const { payload, loading } = useFetch(getCharacterById, id);
  const { data: character } = payload || {};

  return (
    <Card>
      <Skeleton loading={loading} avatar active>
        {character && (
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={character.name || "Unknown"}
          />
        )}
      </Skeleton>
      {character && (
        <Descriptions style={{ paddingTop: 20 }} bordered layout="vertical">
          <Descriptions.Item label="Gender">
            {character.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Born">{character.born}</Descriptions.Item>
          <Descriptions.Item label="Culture">
            {character.culture}
          </Descriptions.Item>
          <Descriptions.Item label="Aliases" span={3}>
            {renderArray(character.aliases)}
          </Descriptions.Item>
          <Descriptions.Item label="Titles" span={3}>
            {renderArray(character.titles)}
          </Descriptions.Item>
          <Descriptions.Item label="Allegiances" span={3}>
            {character.allegiances &&
              character.allegiances
                .filter((link) => !!link)
                .map((houseLink, idx) => (
                  <HouseLink link={houseLink} key={idx} />
                ))}
          </Descriptions.Item>
          <Descriptions.Item label="Father">
            {character.father && <CharacterLink link={character.father} />}
          </Descriptions.Item>
          <Descriptions.Item label="Mother">
            {character.mother && <CharacterLink link={character.mother} />}
          </Descriptions.Item>
          <Descriptions.Item label="Spouse">
            {character.spouse && <CharacterLink link={character.spouse} />}
          </Descriptions.Item>
          <Descriptions.Item label="Played By" span={2}>
            {renderArray(character.playedBy)}
          </Descriptions.Item>
          <Descriptions.Item label="Died">{character.died}</Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
};

export default CharacterDetail;
