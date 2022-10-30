const { promises,unlinkSync } = require("fs");
const { join } = require("path");

const path = "../vue/config";
var timeOut;

const generateJsFile = async (user_id) => {
  var modules = get_modules();
  await asyncWriteFile(user_id + ".js", modules);
  userTimeOut(user_id)
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

const userTimeOut=(user_id)=>{
  clearTimeout(timeOut);
  var filename=user_id+".js";
  timeOut = setTimeout(function() {
    unlinkSync(join(path, filename))
}, 60 * 1000); 
}


module.exports = { generateJsFile };
