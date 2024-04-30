const { prisma } = require("../prisma/prisma_client");
const { minutesToTime } = require("./minutesToTime");

const getScheduleByUserId = async (userId) => {
  const schedule = await prisma.date.findMany({
    where: { userId: parseInt(userId) },
  });

  if (!schedule) {
    throw new Error("Дней нет");
  }

  const formattedDays = schedule.map((day) => ({
    ...day,
    startTime: minutesToTime(day.startTime),
    endTime: minutesToTime(day.endTime),
    startRest: minutesToTime(day.startRest) || null,
    endRest: minutesToTime(day.endRest) || null,
  }));

  return formattedDays;
};

module.exports = { getScheduleByUserId };
