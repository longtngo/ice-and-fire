import React, { useCallback } from "react";
import { Button } from "antd";
import { dispatch } from "use-bus";

import { getCharacterById, characterIdPattern } from "../services/characterApi";
import useFetch from "../hooks/useFetch";
import { parseId } from "../services/common";

const CharacterLink = ({ link }) => {
  const { payload, loading } = useFetch(
    getCharacterById,
    parseId(link, characterIdPattern)
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
