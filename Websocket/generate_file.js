const { promises } = require("fs");
const { join } = require("path");

const generateJsFile = async (user_id) => {
  var modules = get_modules();
  await asyncWriteFile(user_id + ".js", modules);
};

const asyncWriteFile = async (filename, data) => {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */
  //__dirname
  let path = "../vue/config";
  try {
    await promises.writeFile(join(path, filename), create_file(data), {
      flag: "w",
    });

    const contents = await promises.readFile(join(path, filename), "utf-8");
    console.log(contents); // 👉️ "One Two Three Four"

    return contents;
  } catch (err) {
    console.log(err);
    return "Something went wrong";
  }
};

const create_file = (modules) => {
  const text = `let config = {
    paths: "../src/components/Modules",
    modules:${modules}
    };
    if (typeof module !== "undefined") {
        module.exports = config;
      }
    `;
  return text;
};

const get_modules = (user_id) => {
  //TODO: ir a firebase buscar o os dados do utilizador
  //dummy
  data = `[
        {
          module: "CalendarWidget",
          position: {
            x: 0,
            y: 0,
          },
          size: {
            width: 4,
            height: 7,
          },
          config: {},
        }
    ]`;
  return data;
};

module.exports = { generateJsFile };
