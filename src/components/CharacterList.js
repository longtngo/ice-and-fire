import React from "react";
import CharacterCard from "./CharacterCard";
import { Space } from "antd";

const CharacterList = ({ characters, loading, pageSize }) => {
  let chars = [];
  if (!characters || !characters.length) {
    chars.push(...new Array(pageSize).fill(null));
  } else {
    chars.push(...characters);
  }

  return (
    <Space size={[20, 20]} wrap>
      {chars.length &&
        chars.map((char, idx) => {
          return <CharacterCard key={idx} character={char} loading={loading} />;
        })}
    </Space>
  );
};

export default CharacterList;
