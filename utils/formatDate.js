const formatDate = (date) => {
  if (date instanceof Date) {
    return date.toISOString();
  } else {
    // Предполагаем что date приходит в формате строки
    return new Date(date).toISOString();
  }
};

module.exports = { formatDate };
