import React, { useState, useCallback, useEffect } from "react";
import { getHouseById, parseHouseId } from "../services/houseApi";
import { Button } from "antd";

const HouseLink = ({ link }) => {
  const [houseData, setHouseData] = useState(null);
  const [loading, setLoading] = useState();

  const fetchData = useCallback(async (id) => {
    setLoading(true);

    try {
      const resp = await getHouseById(id);
      setHouseData(resp.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!link) return;
    fetchData(parseHouseId(link));
  }, [link, fetchData]);

  if (!houseData) return null;

  return (
    <Button type="link" href={`/houses/${houseData.id}`} loading={loading}>
      {houseData.name}
    </Button>
  );
};

export default HouseLink;
