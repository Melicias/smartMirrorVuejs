<template>
  <div class="player">
    <div class="cover"></div>
    <nav>
      <div class="left">
        <i class="material-icons">menu</i>
        <h6>Playlist</h6>
      </div>
      <div class="right">
        <i class="material-icons search">search</i>
        <i class="material-icons">queue_music</i>
      </div>
    </nav>
    <div class="player-ui">
      <div class="title">
        <h3>Hello</h3>
      </div>
      <div class="small">
        <i class="material-icons">replay</i>
        <p>Adele</p>
        <i class="material-icons">volume_up</i>
      </div>
      <div class="progress">
        <div class="played">
          <div class="circle"></div>
        </div>
      </div>
      <div class="controls">
        <i class="material-icons">skip_previous</i>
        <i class="material-icons">play_arrow</i>
        <i class="material-icons">skip_next</i>
      </div>
    </div>
    <div class="btn">
      <!-- 		<i class="material-icons">shuffle</i> -->
    </div>
    <div class="music">
      <div class="song-1">
        <div class="info">
          <div class="img first"></div>
          <div class="titles">
            <h5>Hello</h5>
            <p>Adele</p>
          </div>
        </div>
        <div class="state playing">
          <i class="material-icons">equalizer</i>
        </div>
      </div>
      <div class="song-2">
        <div class="info">
          <div class="img second"></div>
          <div class="titles">
            <h5>Californication</h5>
            <p>Red Hot Chili Pepers</p>
          </div>
        </div>
        <div class="state">
          <i class="material-icons">play_arrow</i>
        </div>
      </div>
      <div class="song-3">
        <div class="info">
          <div class="img third"></div>
          <div class="titles">
            <h5>6 INCH</h5>
            <p>beyoncé</p>
          </div>
        </div>
        <div class="state">
          <i class="material-icons">play_arrow</i>
        </div>
      </div>
      <div class="song-4">
        <div class="info">
          <div class="img fourth"></div>
          <div class="titles">
            <h5>Purple rain</h5>
            <p>Prince & The Revolution</p>
          </div>
        </div>
        <div class="state">
          <i class="material-icons">play_arrow</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//import { Options, Vue } from 'vue-class-component';
export default {
  name: "musicPlayer",
  component: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
html,
body {
  margin: 0;
  height: 100%;
  align-items: center;
  color: #333;
  font-family: "Roboto", sans-serif;
  font-size: 1em;
  -webkit-font-smoothing: antialiased;
  line-height: 1em;
}
body {
  background: #e9e9e9;
  display: flex;
  justify-content: center;
}
* {
  box-sizing: border-box;
  user-select: none;
}
i {
  cursor: pointer;
}
.player {
  overflow: hidden;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.6);
  position: relative;
  width: 270px;
  height: 460px;
  background-size: contain;
  background-repeat: no-repeat;
}
.player .cover {
  position: absolute;
  z-index: 1;
  width: 320px;
  height: 250px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)),
    url(http://static.stereogum.com/blogs.dir/2/files/2011/12/Adele-21.jpg)
      center bottom;
  background-size: cover;
}
.player nav {
  margin-top: 5px;
  position: relative;
  z-index: 3;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
}
.player nav .left {
  display: flex;
}
.player nav .left i {
  cursor: pointer;
  color: white;
}
.player nav .left h6 {
  margin: 0;
  padding-left: 20px;
  color: white;
  font-size: 18px;
  line-height: 1.38;
}
.player nav .right {
  display: flex;
}
.player nav .right i {
  cursor: pointer;
  color: white;
}
.player nav .right .search {
  padding-right: 10px;
}
.player .player-ui {
  position: relative;
  z-index: 3;
  padding-top: 30px;
}
.player .player-ui .title {
  display: flex;
  justify-content: center;
}
.player .player-ui .title h3 {
  margin: 0;
  color: white;
  font-size: 30px;
  font-weight: 100;
}
.player .player-ui .small {
  padding: 15px 35px 0px 35px;
  display: flex;
  justify-content: space-between;
}
.player .player-ui .small p,
.player .player-ui .small i {
  margin: 0;
  color: white;
  font-size: 14px;
}
.player .player-ui .small p {
  color: #ddd;
}
.player .player-ui .small i {
  font-size: 16px;
}
.player .player-ui .progress {
  position: relative;
  height: 2px;
  margin: 30px 20px 0px 20px;
  background: rgba(255, 255, 255, 0.3);
}
.player .player-ui .progress .played {
  width: 20%;
  height: 2px;
  position: absolute;
  background: #f44336;
}
.player .player-ui .progress .played .circle {
  width: 10px;
  height: 10px;
  background: #f44336;
  border-radius: 50%;
  margin-left: 52px;
  margin-top: -4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
}
.player .player-ui .controls {
  display: flex;
  justify-content: space-between;
  padding: 25px 50px 0px 50px;
}
.player .player-ui .controls i {
  color: white;
  font-size: 32px;
}
.player .btn {
  margin-left: auto;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 4;
  margin-top: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.player .btn i {
  font-size: 28px;
  color: white;
}
.player .music {
  padding: 10px 20px 0px 20px;
  background: #1a1b1e;
  margin-top: -26px;
}
.player .music .song-1,
.player .music .song-2,
.player .music .song-3,
.player .music .song-4 {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.player .music .song-1 .info,
.player .music .song-2 .info,
.player .music .song-3 .info,
.player .music .song-4 .info {
  display: flex;
  align-items: center;
}
.player .music .song-1 .info .img,
.player .music .song-2 .info .img,
.player .music .song-3 .info .img,
.player .music .song-4 .info .img {
  width: 60px;
  height: 60px;
  background: red;
  margin-right: 10px;
}
.player .music .song-1 .info .img.first,
.player .music .song-2 .info .img.first,
.player .music .song-3 .info .img.first,
.player .music .song-4 .info .img.first {
  background: url(http://static.stereogum.com/blogs.dir/2/files/2011/12/Adele-21.jpg)
    center center;
  background-size: cover;
}
.player .music .song-1 .info .img.second,
.player .music .song-2 .info .img.second,
.player .music .song-3 .info .img.second,
.player .music .song-4 .info .img.second {
  background: url(https://upload.wikimedia.org/wikipedia/en/d/df/RedHotChiliPeppersCalifornication.jpg)
    center center;
  background-size: cover;
}
.player .music .song-1 .info .img.third,
.player .music .song-2 .info .img.third,
.player .music .song-3 .info .img.third,
.player .music .song-4 .info .img.third {
  background: url(http://images.rapgenius.com/59fc635f7dbe6b5cd1e07e5e605c96b5.640x640x1.jpg)
    center center;
  background-size: cover;
}
.player .music .song-1 .info .img.fourth,
.player .music .song-2 .info .img.fourth,
.player .music .song-3 .info .img.fourth,
.player .music .song-4 .info .img.fourth {
  background: url(http://djrichiep.us/wp-content/uploads/2014/06/princelgc7F.jpg)
    center center;
  background-size: cover;
}
.player .music .song-1 .info .titles h5,
.player .music .song-2 .info .titles h5,
.player .music .song-3 .info .titles h5,
.player .music .song-4 .info .titles h5,
.player .music .song-1 .info .titles p,
.player .music .song-2 .info .titles p,
.player .music .song-3 .info .titles p,
.player .music .song-4 .info .titles p {
  margin: 0;
  color: white;
}
.player .music .song-1 .info .titles h5,
.player .music .song-2 .info .titles h5,
.player .music .song-3 .info .titles h5,
.player .music .song-4 .info .titles h5 {
  font-size: 17px;
  font-weight: 400;
  margin-bottom: 7px;
}
.player .music .song-1 .info .titles p,
.player .music .song-2 .info .titles p,
.player .music .song-3 .info .titles p,
.player .music .song-4 .info .titles p {
  font-size: 13px;
  color: #929292;
}
.player .music .song-1 .state.playing i,
.player .music .song-2 .state.playing i,
.player .music .song-3 .state.playing i,
.player .music .song-4 .state.playing i {
  color: #f44336;
}
.player .music .song-1 .state i,
.player .music .song-2 .state i,
.player .music .song-3 .state i,
.player .music .song-4 .state i {
  color: #ddd;
}
</style>
