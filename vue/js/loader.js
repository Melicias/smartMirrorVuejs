import config from "../config/config";

export const Loader = function () {
  var moduleFiles = [];

  const getAllModules = function () {
    return config.modules;
  };

  return function () {
    const modules = getAllModules();

    modules.forEach(function (moduleData, index) {
      const module = moduleData.module;

      const elements = module.split("/");
      const moduleName = elements[elements.length - 1];

      let moduleFolder = config.paths + "/" + module;

      if (moduleData.disabled === true) {
        return;
      }

      moduleFiles.push({
        index: index,
        identifier: "module_" + index + "_" + module,
        name: moduleName,
        path: moduleFolder + "/",
        file: moduleName + ".vue",
        position: moduleData.position,
        size: moduleData.size,
        hiddenOnStartup: moduleData.hiddenOnStartup,
        header: moduleData.header,
        configDeepMerge:
          typeof moduleData.configDeepMerge === "boolean"
            ? moduleData.configDeepMerge
            : false,
        config: moduleData.config,
        classes:
          typeof moduleData.classes !== "undefined"
            ? moduleData.classes + " " + module
            : module,
      });
    });
    return moduleFiles;
  };
};
