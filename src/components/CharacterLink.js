import React, { useCallback } from "react";
import { Button } from "antd";
import { dispatch } from "use-bus";

import { getCharacterById, parseCharacterId } from "../services/characterApi";
import useFetch from "../hooks/useFetch";

const CharacterLink = ({ link }) => {
  const { payload, loading } = useFetch(
    getCharacterById,
    parseCharacterId(link)
  );
  const { data: character } = payload || {};

  const handleClick = useCallback(() => {
    if (!character) return;

    dispatch({ type: "CHARACTER_SELECTED", payload: character?.id });
  }, [character]);

  return (
    <Button type="link" onClick={handleClick} loading={loading}>
      {character?.name || "Unknown"}
    </Button>
  );
};

export default CharacterLink;
