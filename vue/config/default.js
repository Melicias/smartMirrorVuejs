let config = {
  paths: "../src/components/Modules",
  user_id: "default",
  modules: [
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
    },
    {
      module: "SpotifyPlayer",
      position: {
        x: 17,
        y: 6,
      },
      size: {
        width: 3,
        height: 11,
      },
      config: {},
    },
    {
      module: "NewsWidget",
      position: {
        x: 3,
        y: 21,
      },
      size: {
        width: 14,
        height: 4,
      },
      config: {},
    },
    {
      module: "WeatherWidget",
      position: {
        x: 11,
        y: 0,
      },
      size: {
        width: 9,
        height: 6,
      },
      config: {},
    },
    {
      module: "generateWifiQRCode",
      position: {
        x: 0,
        y: 7,
      },
      size: {
        width: 2,
        height: 5,
      },
      config: {},
    },
    {
      module: "WaterWidget",
      position: {
        x: 4,
        y: 20,
      },
      size: {
        width: 12,
        height: 1,
      },
      config: {},
    },
  ],
};

if (typeof module !== "undefined") {
  module.exports = config;
}
