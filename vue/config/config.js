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
        width: 4,
        hight: 7,
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
        hight: 11,
      },
      config: {
        
      },
    },
    {
      module: "NewsWidget",
      position: {
        x: 3,
        y: 21,
      },
      size: {
        width: 14,
        hight: 4,
      },
      config: {
        
      },
    },
    {
      module: "WeatherWidget",
      position: {
        x: 11,
        y: 0,
      },
      size: {
        width: 9,
        hight: 6,
      },
      config: {
        
      },
    },
    {
      module: "generateWifiQRCode",
      position: {
        x: 0,
        y: 7,
      },
      size: {
        width: 2,
        hight: 5,
      },
      config: {
        
      },
    },
    {
      module: "WaterWidget",
      position: {
        x: 4,
        y: 20,
      },
      size: {
        width: 12,
        hight: 1,
      },
      config: {
        
      },
    },
  ],
};

if (typeof module !== "undefined") {
  module.exports = config;
}
