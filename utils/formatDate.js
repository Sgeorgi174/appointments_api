javascript;
const formatDate = (date) => {
  const jsDate = new Date(Date.parse(date));
  const isoDate = jsDate.toISOString();
  return isoDate;
};

module.exports = { formatDate };
