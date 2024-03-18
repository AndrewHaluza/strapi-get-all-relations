const fs = require("fs");
const path = require("path");

module.exports.writeRelations = function (relations) {
  if (!process.env.OUTPUT_PATH) {
    throw new Error("OUTPUT_PATH is required");
  }

  const jsonPath = path.join(process.env.OUTPUT_PATH, "relations.json");

  fs.writeFile(jsonPath, JSON.stringify(relations, null, 2), (err) => {
    if (err) {
      throw new Error("Error writing relations");
    }
  });

  makeTable(relations);
};

function makeTable(relations) {
  if (!process.env.OUTPUT_PATH) {
    throw new Error("OUTPUT_PATH is required");
  }

  const tablePath = path.join(process.env.OUTPUT_PATH, "table.csv");

  let table = "Entity,Relation,Target\n";

  for (let entity in relations) {
    for (let relation in relations[entity]) {
      table += `${entity},${relation},${relations[entity][relation]}\n`;
    }
  }

  fs.writeFile(tablePath, table, (err) => {
    if (err) {
      throw new Error("Error writing relations");
    }
  });
}
