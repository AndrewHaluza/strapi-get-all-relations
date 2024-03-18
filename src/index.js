const { apiProcessing } = require("./api");
const { writeRelations } = require("./writeRelations");

require("dotenv").config();

module.exports = async function entrypoint() {
  const apiPath = process.env.API_PATH;
  const componentsPath = process.env.COMPONENTS_PATH;

  if (!process.env.API_PATH || !process.env.COMPONENTS_PATH) {
    throw new Error("API_PATH and COMPONENTS_PATH are required");
  }

  console.log("API Path:", apiPath);
  console.log("Components Path:", componentsPath);

  const relations = {};

  await apiProcessing(relations);
  
  await writeRelations(relations);
};
