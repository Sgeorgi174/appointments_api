const formatDate = (date) => {
  // const jsDate = new Date(date);
  // console.log(jsDate, "jsData");
  const isoDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString();

  return isoDate;
};

module.exports = { formatDate };
