import React, { useState, useCallback, useEffect } from "react";
import { getCharacterById, parseCharacterId } from "../services/characterApi";
import { Button } from "antd";

const CharacterLink = ({ link }) => {
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (id) => {
    setLoading(true);

    try {
      const resp = await getCharacterById(id);
      setCharacterData(resp.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!link) return;
    fetchData(parseCharacterId(link));
  }, [link, fetchData]);

  if (!characterData) return null;

  return (
    <Button
      type="link"
      href={`/characters/${characterData.id}`}
      loading={loading}
    >
      {characterData.name}
    </Button>
  );
};

export default CharacterLink;
