const formatDate = (date) => {
  const jsDate = new Date(Date.parse(date));
  console.log(jsDate, "jsData");
  const isoDate = new Date(
    Date.UTC(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate())
  ).toISOString();

  return isoDate;
};

function formatDateYYYYMMDD(date) {
  return date.toISOString().split("T")[0];
}

module.exports = { formatDate, formatDateYYYYMMDD };
