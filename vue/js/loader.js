import config from "../config/default";
//import Things  from '../config/*';
var cache = [];

function importAll(r) {
  r.keys().forEach((key) => cache.push(r(key)));
}
importAll(require.context("../config/", true, /.js$/));

export const Loader = function () {
  var moduleFiles = [];

  const getAllModules = function () {
    var modules = [];

    cache.forEach((x) => {
      x.modules.owner = x.user_id;

      modules.push(x.modules);
    });

    return modules;
  };

  return function () {
    var modules = getAllModules();
    var index = 0;

    modules = modules.map((x) => {
      return {
        [x.owner]: x.map((moduleData) => {
          const module = moduleData.module;
          //const elements = module.split("/");
          const moduleName = module;
          const owner = x.owner;
          let moduleFolder = config.paths + "/" + module;
          if (moduleData.disabled === true) {
            return;
          }
          return {
            index: index++,
            owner: owner,
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
          };
        }),
      };
    });

    return modules;
  };
};
