module.exports.componentProcessing = function (componentName) {
  if (!process.env.COMPONENTS_PATH) {
    throw new Error("COMPONENTS_PATH is required");
  }

  const [folder, componentFileName] = componentName.split(".");
  const componentJsonPath = `${process.env.COMPONENTS_PATH}/${folder}/${componentFileName}.json`;
  const componentJson = require(componentJsonPath);

  return componentJson;
};
