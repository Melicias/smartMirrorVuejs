<template>
  <body>
    <grid-layout
      class="grid"
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
      :margin="margin"
      :is-bounded="true"
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
          class="vue-grid-item"
          v-for="item in layout"
          :key="item.i"
          v-bind="gridItemProps"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
        >
          <component :is="item.d" :config="item.config"></component>
        </grid-item>
      </template>
    </grid-layout>
  </body>
</template>
<script>
import * as widgets from "../js/widget_imports";

import loader, { Loader } from "../js/loader";

export default {
  components: {
    ...widgets,
  },
  name: "App",
  import: [widgets],
  data() {
    return {
      col: 6,
      row: 15,
      layout: [],
      draggable: true,
      resizable: true,
      time: 0,
      margin: [10, 10],
    };
  },
  created() {
    var Modules = Loader()();
    console.log(Modules);
    Modules.forEach((x) => {
      var module = {
        x: x.position.x,
        y: x.position.y,
        w: x.size.width,
        h: x.size.hight,
        i: x.index,
        d: x.name,
        config: x.config,
      };
      this.layout.push(module);
    });
  },
};
</script>

<style scoped>
.vue-grid-layout {
  background: rgb(216, 6, 6);
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: transparent;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #cce;
}
.vue-grid-item {
  position: absolute;
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
