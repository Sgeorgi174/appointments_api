const { prisma } = require("../prisma/prisma_client");

const findAvailablePort = async () => {
  for (let port = 3000; port <= 5000; port++) {
    if (port === 3389) {
      continue;
    }
    const existingBot = await prisma.userBotSettings.findFirst({
      where: {
        port,
      },
    });
    if (!existingBot) {
      return port;
    }
  }
  throw new Error("Нет доступных портов");
};

module.exports = { findAvailablePort };
