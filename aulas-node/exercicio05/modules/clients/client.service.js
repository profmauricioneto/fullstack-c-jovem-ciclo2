const clients = require("../../config/data.clients");
const bcrypt = require("bcrypt");
const logger = require("../../shared/logger");

let idClient = 2;

exports.registerClient = async (nome, email, senha) => {
  try {
    logger.info("Start client registration", { nome, email });

    const existsClient = clients.find((client) => client.email === email);
    if (existsClient) {
      logger.warn("Trying to register with already email", { email });
      throw new Error("Client already register with this email");
    }

    const criptPassword = await bcrypt.hash(senha, 10);

    const newClient = {
      id: idClient + 1,
      nome,
      email,
      senha: criptPassword,
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      status: "active",
    };

    clients.push(newClient);

    logger.info("Client register with success", {
      clientId: newClient.id,
      email: newClient.email,
    });

    const { senha: _, ...clientData } = newClient;
    return clientData;
  } catch (error) {
    logger.error("Error to register a client", {
      error: error.message,
      email,
    });
    throw error;
  }
};

exports.getAllClients = () => {
  try {
    logger.info("Recovering all clients");

    const getClients = clients.map((clients) => {
      const { senha, ...clientData } = client;
      return clientData;
    });

    logger.info("Recovering clients with success", {
      count: getClients.length,
    });

    return getClients;
  } catch (error) {
    logger.error("Erro ao listar clientes", { error: error.message });
    throw error;
  }
};
