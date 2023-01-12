<template>
  <body>
    <div :class="{ wrapper: modules?.length >= 2 }">
      <div v-for="message in modules" :key="message">
        <div v-for="module in message" :key="module">
          <div class="textContainer">
            <div class="box">
              <div class="box-content">
                <p>{{ module[0]?.owner }}</p>
              </div>
            </div>
          </div>
          <grid-layout
            :layout="layout"
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
                v-for="item in module"
                :key="item.index"
                v-bind="gridItemProps"
                :x="item.position.x"
                :y="item.position.y"
                :w="item.size.width"
                :h="item.size.height"
                :i="item.index"
              >
                <component
                  :is="item.name"
                  :config="item.config"
                  :class="{ replaced: modules?.length >= 2 }"
                ></component>
              </grid-item>
            </template>
          </grid-layout>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import * as widgets from "../js/widget_imports";
import { store } from "./store/index";
import { Loader } from "../js/loader";
import { APIService } from "../src/services/APIService";
export default {
  components: {
    ...widgets,
  },
  name: "App",
  import: [widgets],
  data() {
    return {
      socket: null,
      col: 20,
      row: 30,
      layout: [],
      modules: [],
      draggable: true,
      resizable: false,
      time: 0,
      margin: [10, 10],
    };
  },
  created() {
    this.modules = Loader()();
    console.log(this.modules);
    this.modules.forEach((module) => {
      for (let key in module) {
        module[key].forEach((x) => {
          const newModule = {
            x: x.position.x,
            y: x.position.y,
            w: x.size.width,
            h: x.size.height,
            i: x.index,
            d: x.name,
            config: x.config,
          };
          this.layout.push(newModule);
        });
      }
    });
  },
  mounted() {
    store.dispatch("CONNECT");
  },
  methods: {
    getLog(msg) {
      console.log(msg);
    },
  },
};
</script>

<style scoped>
.textContainer {
  position: relative;
}
.box {
  position: absolute;
  overflow: hidden;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(240, 12, 12, 0); /* adjust transparency as needed */
  border-radius: 10px; /* adjust as needed */
  padding: 10px;
  text-align: center;
  /* adjust border as needed */

  /* adjust border width as needed */
}

.box-content {
  color: rgb(80, 77, 77);
  opacity: 0.8; /* adjust color as needed */
  font-size: 15px; /* adjust as needed */
  font-weight: bold; /* adjust as needed */
  text-transform: uppercase;
  text-align: center;
}
.replaced {
  transform: scale(0.5);
}
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

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
