import React, { useCallback } from "react";
import { Button } from "antd";
import { dispatch } from "use-bus";

import { getCharacterById, characterIdPattern } from "../services/characterApi";
import useFetch from "../hooks/useFetch";
import { parseId } from "../services/common";
import NavButton from "./NavButton";

const CharacterLink = ({ link, mode }) => {
  const { payload, loading } = useFetch(
    getCharacterById,
    parseId(link, characterIdPattern)
  );
  const { data: character } = payload || {};

  const handleClick = useCallback(() => {
    if (!character) return;

    dispatch({ type: "CHARACTER_SELECTED", payload: character?.id });
  }, [character]);

  const name = character?.name || "Unknown";
  if (mode === "navButton") {
    return (
      <NavButton
        type="link"
        href={`/characters/${character?.id}`}
        loading={loading}
      >
        {name}
      </NavButton>
    );
  }

  return (
    <Button type="link" onClick={handleClick} loading={loading}>
      {name}
    </Button>
  );
};

export default CharacterLink;
