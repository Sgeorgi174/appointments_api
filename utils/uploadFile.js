const uploadFile = async (file, userId) => {
  if (!file) return null;
  const { filename } = file[0]; // Выбираем первый файл из массива файлов
  return `/uploads/${userId}/${filename}`; // Пока что просто возвращаем путь к файлу
};

module.exports = { uploadFile };
