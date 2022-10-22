<template>
  <body>
    <grid-layout
      v-model:layout="layout"
      :col-num="this.col"
      :row-height="this.row"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :responsive="false"
      :vertical-compact="false"
      :prevent-collision="true"
      :use-css-transforms="true"
      :autoSize="true"
    >
      <template #default="{ gridItemProps }">
        <!-- | gridItemProps props from GridLayout | -->
        <!--breakpointCols: props.cols-->
        <!--colNum: props.colNum-->
        <!--containerWidth: width.value-->
        <!--isDraggable: props.isDraggable-->
        <!--isResizable: props.isResizable-->
        <!--lastBreakpoint: lastBreakpoint.value-->
        <!--margin: props.margin-->
        <!--maxRows: props.maxRows-->
        <!--responsive: props.responsive-->
        <!--rowHeight: props.rowHeight-->
        <!--useCssTransforms: props.useCssTransforms-->
        <!--width: width.value-->
        <grid-item
          v-for="item in layout"
          :key="item.i"
          v-bind="gridItemProps"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
        >
          <component :is="item.d"></component>
        </grid-item>
      </template>
    </grid-layout>
  </body>
</template>
<script>
import MusicPlayer from "./components/MusicPlayer.vue";
import WeatherWidget from "./components/WeatherWidget.vue";
import CalendarWidget from "./components/CalendarWidget.vue";
import TimeWidget from "./components/TimeWidget.vue";
import NewsWidget from "./components/NewsWidget.vue";
import YoutubeWidget from "./components/YoutubeWidget.vue";
import SpotifyPlayer from "./components/SpotifyPlayer.vue";
import StatsWidget from "./components/StatsWidget.vue";
import WaterWidget from "./components/WaterWidget.vue";
import SoccerTable from "./components/SoccerTable.vue";
import WifiQRCode from "./components/WifiQRCodeWidget.vue";

export default {
  components: {
    MusicPlayer,
    WeatherWidget,
    CalendarWidget,
    TimeWidget,
    NewsWidget,
    YoutubeWidget,
    SpotifyPlayer,
    StatsWidget,
    WaterWidget,
    WifiQRCode,
    SoccerTable,
  },
  name: "App",
  import: [
    MusicPlayer,
    WeatherWidget,
    CalendarWidget,
    TimeWidget,
    NewsWidget,
    YoutubeWidget,
    StatsWidget,
    WaterWidget,
    SoccerTable,
  ],
  data() {
    return {
      col: 30,
      row: 60,
      layout: [
        //{ x: 0, y: 0, w: 3, h: 4, i: 3, d: "TimeWidget" },
        //{ x: 2, y: 2, w: 2, h: 4, i: 1 ,d:'MusicPlayer'},

        //{ x: 0, y: 10, w: 4, h: 8, i: 5, d: "YoutubeWidget" },
        //{ x: 4, y: 10, w: 2, h: 2, i: 5, d: "StatsWidget" },
        { x: 0, y: 0, w: 6, h: 6, i: 0, d: "CalendarWidget" },
        { x: 15, y: 0, w: 15, h: 3, i: 1, d: "WeatherWidget" },
        { x: 4, y: 11, w: 22, h: 2, i: 2, d: "NewsWidget" },
        { x: 6, y: 9, w: 18, h: 1, i: 3, d: "WaterWidget" },
        { x: 25, y: 3, w: 5, h: 6, i: 4, d: "SpotifyPlayer" },
        { x: 0, y: 6, w: 4, h: 3, i: 8, d: "WifiQRCode" },
        //{ x: 4, y: 4, w: 3.5, h: 10, i: 9, d: "SoccerTable" },
      ],
      draggable: true,
      resizable: true,
      time: 0,
    };
  },
};
</script>

<style scoped>
.vue-grid-layout {
  background: rgb(216, 6, 6);
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: transparent;
  border: 1px solid black;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #cce;
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
.shrink{
  -webkit-transform:scale(0.5);
  -moz-transform:scale(0.5);
  -ms-transform:scale(0.5);
  transform:scale(0.5);
}
</style>
