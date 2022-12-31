const { promises, unlinkSync } = require("fs");
const { join } = require("path");

const fs = require("fs");
const path = "../vue/config";
var timeOut = [];

const generateJsFile = async (userData) => {
  console.dir("userData" + userData);
  var modules = get_modules(userData);
  await asyncWriteFile(userData.user_id + ".js", modules);
  userTimeOut(userData.user_id);
};

const asyncWriteFile = async (filename, data) => {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */
  //__dirname
  try {
    await promises.writeFile(join(path, filename), create_file(data), {
      flag: "w",
    });

    //const contents = await promises.readFile(join(path, filename), "utf-8");
    //console.log("teste" + contents); // 👉️ "One Two Three Four"

    // return contents;
  } catch (err) {
    console.log(err);
    return "Something went wrong";
  }
};

const create_file = (modules) => {
  console.log("teste" + modules);
  const text = `let config = {
    paths: "../src/components/Modules",
    user_id:${JSON.stringify(modules.user_id)},
    modules:${JSON.stringify(modules.module)}
    };
    if (typeof module !== "undefined") {
        module.exports = config;
      }
    `;
  return text;
};

const get_modules = (rawModule) => {
  return rawModule;
};

const userTimeOut = (user_id) => {
  var filename = user_id + ".js";
  if (timeOut.length) {
    clearTimeout(timeOut.find((x) => x.key == user_id).timer);
    timeOut = timeOut.filter((x) => x.key !== user_id);
  }
  var auxtimeOut = setTimeout(function () {
    if (fs.existsSync(join(path, filename))) {
      unlinkSync(join(path, filename));
    }
  }, 60 * 1000);
  timeOut.push({ key: user_id, timer: auxtimeOut });
};

module.exports = { generateJsFile };
