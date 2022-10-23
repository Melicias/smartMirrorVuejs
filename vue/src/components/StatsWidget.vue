<template>
    <div style="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:90000"> 
      <canvas id="fps" ref='fps' :style="{width:this.WIDTH+'px',height:this.HEIGHT+'px'}"> 

      </canvas>
       <canvas id="ms" ref='ms' :style="{width:this.WIDTH+'px',height:this.HEIGHT+'px'}"> 

      </canvas>
       <canvas id="mem" ref='mem' :style="{width:this.WIDTH+'px',height:this.HEIGHT+'px'}"> 

      </canvas>
    </div>
</template>

<script>
  export default {
  components: {},
    name: 'App',
    import:[],
    data () {
      return {
        beginTime: null, 
        prevTime: null,
        frames: 0,
        fpsPanel: null,
        msPanel: null,
        memPanel: null,
        PR: 2,
        WIDTH: 80 , 
        HEIGHT: 48 ,
        TEXT_X: 3 , 
        TEXT_Y: 2 ,
        GRAPH_X: 3 , 
        GRAPH_Y: 15 ,
        GRAPH_WIDTH: 74 , 
        GRAPH_HEIGHT: 30 ,
      }
    },
    methods: {
        end: function () {
          this.frames ++;
          var time = ( performance || Date ).now();
          this.update_st(this.msPanel, time - this.beginTime, 200 , 'MS', '#0f0', '#020');
          this.update_st(this.fpsPanel, ( this.frames * 1000 ) / ( time - this.prevTime ), 100 , 'FPS', '#0ff', '#002');
          this.prevTime = time;
          this.frames = 0;
          var memory = performance.memory;
          this.update_st(this.memPanel, memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576 , 'MB', '#f08', '#201');
          return time;
        },
        update: function () {
          this.beginTime = this.end();
        },
        panel: function (context,name, fg, bg ) {
          var PR = Math.round( window.devicePixelRatio || 1 );

          this.WIDTH = 80 * this.PR; 
          this.HEIGHT = 48 * this.PR;
          this.TEXT_X = 3 * this.PR;
          this.TEXT_Y = 2 * this.PR;
          this.GRAPH_X = 3 * this.PR;
          this.GRAPH_Y = 15 * this.PR;
          this.GRAPH_WIDTH = 74 * this.PR;
          this.GRAPH_HEIGHT = 30 * this.PR;

          context.font = 'bold ' + ( 9 * PR ) + 'px Helvetica,Arial,sans-serif';
          context.textBaseline = 'top';

          context.fillStyle = bg;
          context.fillRect( 0, 0, this.WIDTH, this.HEIGHT );

          context.fillStyle = fg;
          context.fillText( name, this.TEXT_X, this.TEXT_Y );
          context.fillRect( this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT );

          context.fillStyle = bg;
          context.globalAlpha = 0.9;
          context.fillRect( this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT );
        },
        update_st: function (context, value, maxValue, name, fg, bg) {
          var min = Infinity, max = 0, round = Math.round;
          min = Math.min( min, value );
          max = Math.max( max, value );

          context.fillStyle = bg;
          context.globalAlpha = 1;
          context.fillRect( 0, 0, this.WIDTH, this.GRAPH_Y );
          context.fillStyle = fg;
          context.fillText( round( value ) + ' ' + name + ' (' + round( min ) + '-' + round( max ) + ')', this.TEXT_X, this.TEXT_Y );

          //n consegui por isto a dar
          //context.drawImage( context, this.GRAPH_X + this.PR, this.GRAPH_Y, this.GRAPH_WIDTH - this.PR, this.GRAPH_HEIGHT, this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH - this.PR, this.GRAPH_HEIGHT );

          context.fillRect( this.GRAPH_X + this.GRAPH_WIDTH - this.PR, this.GRAPH_Y, this.PR, this.GRAPH_HEIGHT );

          context.fillStyle = bg;
          context.globalAlpha = 0.9;
          context.fillRect( this.GRAPH_X + this.GRAPH_WIDTH - this.PR, this.GRAPH_Y, this.PR, round( ( 1 - ( value / maxValue ) ) * this.GRAPH_HEIGHT ) );

        }
    },
    mounted() {
      this.beginTime = ( performance || Date ).now()
      this.prevTime = this.beginTime
      this.fpsPanel = this.$refs.fps.getContext("2d");
      this.msPanel = this.$refs.ms.getContext("2d");
      this.memPanel = this.$refs.mem.getContext("2d");
      this.panel(this.fpsPanel,'FPS', '#0ff', '#002')
      this.panel(this.msPanel,'MS', '#0f0', '#020')
      this.panel(this.memPanel,'MB', '#f08', '#201')
      setInterval(this.update, 2000);
      //this.createCanvas()
    }
  }
  </script>

<style scoped>

</style>