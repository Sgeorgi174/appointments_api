const formatDate = (date) => {
  const jsDate = new Date(date);
  console.log(jsDate, "jsData");
  const isoDate = new Date(
    Date.UTC(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate())
  ).toISOString();

  return isoDate;
};

module.exports = { formatDate };
