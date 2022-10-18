let config = {
  paths: "../src/components/Modules",
  modules: [
    {
      module: "CalendarWidget",
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: 2,
        hight: 6,
      },
      config: {},
    },
    {
      module: "CalendarWidget",
      position: {
        x: 1,
        y: 6,
      },
      size: {
        width: 2,
        hight: 2,
      },
      config: {
        mamae: "sabado",
      },
    },
    {
      module: "SpotifyPlayer",
      position: {
        x: 1,
        y: 6,
      },
      size: {
        width: 1,
        hight: 18,
      },
      config: {
        mamae: "sabado",
      },
    },
  ],
};

if (typeof module !== "undefined") {
  module.exports = config;
}
