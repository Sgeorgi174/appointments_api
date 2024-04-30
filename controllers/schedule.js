const { prisma } = require("../prisma/prisma_client");

const addDay = async (req, res) => {
  const { startDay, endDay, month, year, startTime, endTime } = req.body;
  const userId = req.user.id;

  for (let i = startDay; i <= endDay; i++) {
    await prisma.date.create({
      data: {
        date: `${year}-${month}-${i}`,
        startTime: parseInt(startTime),
        endTime: parseInt(endTime),
        userId,
      },
    });
  }
};

module.exports = {};
