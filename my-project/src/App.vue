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
          @resize="resize"
          @move="move"
          @moved="moved"
        >
          {{ item.i + " teste" }}
        </grid-item>
      </template>
    </grid-layout>
    </body>
  </template>
  <script>
  export default {
    name: 'App',
    data () {
      return {
        layout: [
          { x: 0, y: 0, w: 2, h: 2, i: 0 },
          { x: 2, y: 0, w: 2, h: 4, i: 1 },
          { x: 4, y: 0, w: 2, h: 5, i: 2 },
          { x: 6, y: 0, w: 2, h: 3, i: 3 },
          { x: 8, y: 0, w: 2, h: 3, i: 4 },
          { x: 8, y: 0, w: 2, h: 3, i: 5 },
          { x: 0, y: 5, w: 2, h: 5, i: 6 },
          { x: 2, y: 5, w: 2, h: 5, i: 7 },
          { x: 4, y: 5, w: 2, h: 5, i: 8 },
          { x: 6, y: 3, w: 2, h: 4, i: 9 }
        ]
      }
    }
  }
  </script>

  <style scoped>
.vue-grid-layout {
    background: rgb(216, 6, 6);
}
.vue-grid-item:not(.vue-grid-placeholder) {
    background: rgb(247, 247, 247);
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
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
</style>