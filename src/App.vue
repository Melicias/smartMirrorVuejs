<template>
  <body>
    <grid-layout
      v-model:layout="layout"
      :col-num="12"
      :row-height="30"
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
export default {
  components: {
    MusicPlayer,
    WeatherWidget,
    CalendarWidget,
    TimeWidget,
    NewsWidget,
    YoutubeWidget,
    SpotifyPlayer
  },
  name: "App",
  import: [
    MusicPlayer,
    WeatherWidget,
    CalendarWidget,
    TimeWidget,
    NewsWidget,
    YoutubeWidget,
  ],
  data() {
    return {
      layout: [
        //{ x: 0, y: 0, w: 3, h: 4, i: 3, d: "TimeWidget" },
        { x: 0, y: 0, w: 3, h: 7, i: 0, d: "CalendarWidget" },
        //{ x: 2, y: 2, w: 2, h: 4, i: 1 ,d:'MusicPlayer'},
        { x: 7, y: 0, w: 5, h: 5, i: 2, d: "WeatherWidget" },
        { x: 1, y: 21, w: 10, h: 4, i: 4, d: "NewsWidget" },
        { x: 0, y: 10, w: 4, h: 8, i: 5, d: "YoutubeWidget" },
        { x: 10, y: 10, w: 2, h: 4, i: 3, d: "SpotifyPlayer" },
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
</style>
