const { componentProcessing } = require("../components");

module.exports.apiProcessing = async function (relations) {
  const { readdir } = require("fs").promises;

  if (!process.env.API_PATH) {
    throw new Error("API_PATH is required");
  }

  const apiDir = (await readdir(process.env.API_PATH)).filter(
    (name) => !name.startsWith(".")
  );

  for (let entity of apiDir) {
    const entityJsonPath = `${process.env.API_PATH}/${entity}/content-types/${entity}/schema.json`;
    const entityJson = require(entityJsonPath);

    for (let field in entityJson?.attributes) {
      const attribute = entityJson.attributes[field];

      if (attribute.type === "relation") {
        processAttribute(
          relations,
          entity,
          field,
          entityJson.attributes,
          field
        );
      } else if (attribute.type === "component") {
        const result = componentProcessing(attribute.component);

        for (let componentField in result?.attributes) {
          const componentAttributes = result?.attributes;

          if (componentAttributes[componentField].type === "relation") {
            processAttribute(
              relations,
              entity,
              componentField,
              componentAttributes,
              `${field}.${componentField}`
            );
          }
        }
      }
    }
  }
};

function processAttribute(relations, entity, field, attributes, relationPath) {
  const attribute = attributes[field];

  if (!relations[entity]) {
    relations[entity] = {};
  }

  relations[entity][relationPath] = attribute.target;
}
