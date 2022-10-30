let config = {
    paths: "../src/components/Modules",
    modules:[
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
    ]
    };
    if (typeof module !== "undefined") {
        module.exports = config;
      }
    