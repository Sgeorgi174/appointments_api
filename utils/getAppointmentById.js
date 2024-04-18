const { prisma } = require("../prisma/prisma_client");

const getAppointmentById = async ({ id }) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: parseInt(id) },
    include: { service: true, client: true },
  });

  if (!appointment) {
    throw new Error("Запись не найдена");
  }

  return appointment;
};

module.exports = { getAppointmentById };
