export const renderArray = (values) => {
  const displayValues = values.filter((v) => !!v);

  if (!displayValues || !displayValues.length) return;

  if (displayValues.length === 1) return displayValues[0];

  return (
    <ul>
      {displayValues.map((value, idx) => (
        <li key={idx}>{value}</li>
      ))}
    </ul>
  );
};
