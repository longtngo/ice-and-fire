import React, { useCallback } from "react";
import { Button } from "antd";
import { dispatch } from "use-bus";

import { getHouseById, houseIdPattern } from "../services/houseApi";
import useFetch from "../hooks/useFetch";
import { parseId } from "../services/common";
import NavButton from "./NavButton";

const HouseLink = ({ link, mode }) => {
  const { payload, loading } = useFetch(
    getHouseById,
    parseId(link, houseIdPattern)
  );
  const { data: house } = payload || {};

  const handleClick = useCallback(() => {
    if (!house) return;

    dispatch({ type: "HOUSE_SELECTED", payload: house?.id });
  }, [house]);

  if (mode === "navButton") {
    return (
      <NavButton type="link" href={`/houses/${house?.id}`} loading={loading}>
        {house?.name}
      </NavButton>
    );
  }

  return (
    <Button type="link" onClick={handleClick} loading={loading}>
      {house?.name}
    </Button>
  );
};

export default HouseLink;
