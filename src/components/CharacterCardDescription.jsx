import React from "react";

const CharacterCardDescription = ({ values, fieldName, plural = "s" }) => {
  let manyValues = values.length > 1;
  return (
    <div title={values.join(", ")}>
      <span>
        {fieldName}
        {`${manyValues ? plural : ""}`}:{" "}
      </span>
      <span>{values?.[0] || "None"}</span>
      {manyValues ? " ..." : ""}
    </div>
  );
};

export default CharacterCardDescription;
