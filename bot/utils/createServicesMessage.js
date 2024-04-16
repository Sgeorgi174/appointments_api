const createServicesList = (services) => {
  return `${services
    .map((el) => {
      return `✅${el.name}:
Цена: ${el.price}руб, 
Продолжительность: ${el.duration}ч

`;
    })
    .join("")}`;
};

module.exports = { createServicesList };
