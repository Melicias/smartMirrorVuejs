<template>
  <div class="">
    
    <div class="grid">
      <h1>TESTE</h1> <h1>TESTE</h1> <h1>TESTE</h1>
      <div class="square"
      v-for="(box, index) in boxes"
      :id="index"
      :key="index"
      :style="{border:'3px solid blue', position: 'fixed', top:box.x +'px', left: box.y + 'px', width: size + 'px', height: size + 'px'}">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "mainBoard",
    component: {},
    data() {
      return {
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
        boxes: [],
        squaresHeight: 20,
        size: 0
      };
    },
    methods: {
      splitPageSquares(){
        console.log(this.windowHeight)
        console.log(this.windowWidth)

        this.size = this.windowHeight / this.squaresHeight
        let n = Math.floor(this.windowWidth % this.size)

        /*for (let i = 0; i < 8; i++) {
          this.boxes[i] = []
          for (let j = 0; j < 8; j++) {
            this.boxes[i][j] = {x: teste*i , y: teste*j}
          }
        }*/
        let j = 0
        for (let i = 0; i < this.squaresHeight*n; i++) {
            this.boxes[i] = {x: this.size*(i%this.squaresHeight) , y: this.size* Math.floor(i/this.squaresHeight)}
        }
        console.log(this.boxes)
      },
      onResize() {
        this.windowHeight= window.innerHeight
        this.windowWidth= window.innerWidth
        console.log("deu")
        this.splitPageSquares()
      }
    },
    mounted() {
      this.splitPageSquares()
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
      })
    },
    beforeDestroy() { 
      window.removeEventListener('resize', this.onResize); 
    },
  }
  </script>

<style scoped>

</style>
