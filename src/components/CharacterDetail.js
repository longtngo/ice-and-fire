import React, { useCallback, useEffect, useState } from "react";
import { getCharacterById } from "../services/characterApi";
import { Card, Descriptions } from "antd";
import CharacterLink from "./CharacterLink";
import HouseLink from "./HouseLink";

const renderArray = (values) => {
  return (
    <ul>
      {values.map((value, idx) => (
        <li key={idx}>{value}</li>
      ))}
    </ul>
  );
};

const CharacterDetail = ({ id, onClose }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const resp = await getCharacterById(id);
      setCharacter(resp.data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  if (!character) return null;

  return (
    <Card
      title={character.name || "Unknown"}
      loading={loading}
      extra={<button onClick={onClose}>Close</button>}
    >
      <Descriptions bordered>
        <Descriptions.Item label="Gender">{character.gender}</Descriptions.Item>
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
            character.allegiances.map((houseLink) => (
              <HouseLink link={houseLink} />
            ))}
        </Descriptions.Item>
        <Descriptions.Item label="Father">
          <CharacterLink link={character.father} />
        </Descriptions.Item>
        <Descriptions.Item label="Mother">
          <CharacterLink link={character.mother} />
        </Descriptions.Item>
        <Descriptions.Item label="Spouse">
          <CharacterLink link={character.spouse} />
        </Descriptions.Item>
        <Descriptions.Item label="Played By" span={2}>
          {renderArray(character.playedBy)}
        </Descriptions.Item>
        <Descriptions.Item label="Died">{character.died}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CharacterDetail;
