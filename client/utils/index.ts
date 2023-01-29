export const getDateFieldValue = (fullDateStr: string) => {
  const dateObj = new Date(fullDateStr);
  const days = dateObj
    .getUTCDate()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  const months = (dateObj.getUTCMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  return `${dateObj.getUTCFullYear()}-${months}-${days}`;
};

export const isValidStr = (str: string | undefined | null) => {
  return str !== undefined && str !== null && str.length > 0;
};
