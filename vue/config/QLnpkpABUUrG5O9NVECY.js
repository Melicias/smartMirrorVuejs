let config = {
    paths: "../src/components/Modules",
    user_id:"QLnpkpABUUrG5O9NVECY",
    modules:[{"position":{"y":8,"x":17},"size":{"height":11,"width":3},"module":"SpotifyPlayer","name":"Spotify player widget","config":{"apiKey":""}},{"module":"WeatherWidget","size":{"height":6,"width":9},"name":"Weather widget","position":{"y":1,"x":11},"config":{"longitude":"-8.821209","apiKey":"","latitude":"39.734097"}},{"config":{"apiKey":""},"name":"News widget","module":"NewsWidget","size":{"width":14,"height":4},"position":{"x":3,"y":21}},{"size":{"height":5,"width":2},"position":{"x":0,"y":7},"module":"generateWifiQRCode","name":"Wifi QR code","config":{"ssid":"myinter","password":"teste123","encryption":"wpa"}},{"position":{"x":3,"y":8},"size":{"height":16,"width":6},"module":"SoccerTable","name":"Soccer Table widget","config":{}},{"position":{"x":0,"y":14},"name":"Youtube widget","config":{"urlid":"PibN0RDtpeY"},"size":{"height":8,"width":6},"module":"YoutubeWidget"}]
    };
    if (typeof module !== "undefined") {
        module.exports = config;
      }
    