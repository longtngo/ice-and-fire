import React from "react";

const CharacterCardDescription = ({ values, fieldName, plural = "s" }) => {
  const displayValues = values.filter((value) => !!value);
  let manyValues = displayValues.length > 1;
  return (
    <div title={displayValues.join(", ")}>
      <span>
        {fieldName}
        {`${manyValues ? plural : ""}`}:{" "}
      </span>
      <span>{displayValues?.[0] || "None"}</span>
      {manyValues ? " ..." : ""}
    </div>
  );
};

export default CharacterCardDescription;
