<template>
  <div :style="{visibility: this.visibilityHidden}">
    <div style="text-align: center;">
      <button @click="applyConfig">Apply</button>
      <button @click="playCurrentVideo">Play</button>
      <button @click="stopCurrentVideo">Stop</button>
      <button @click="pauseCurrentVideo">Pause</button>
    </div>
    <YoutubeVue3 ref="youtube" :videoid="play.video_id" :loop="play.loop" :width="480" :height="320"
      @ended="onEnded" @paused="onPaused" @played="onPlayed"/>
  </div>
</template>

<script>
import { YoutubeVue3 } from 'youtube-vue3'

export default {
  name: 'YoutubeWidget',
  props: {
    config: {},
  },
  data() {
    return {
      temp: { video_id: "vFU92ho_Q4Y", loop: 1 },
      play : { video_id: "vFU92ho_Q4Y", loop: 1 },
      visibilityHidden: ""
    }
  },
  components: {
    YoutubeVue3,
  },
  methods: {
    applyConfig() {
      this.play = Object.assign(this.play, this.temp)
    },
    playCurrentVideo() {
      this.$refs.youtube.player.playVideo();
    },
    stopCurrentVideo() {
      this.$refs.youtube.player.stopVideo();
    },
    pauseCurrentVideo() {
      this.$refs.youtube.player.pauseVideo();
    },
    onEnded() {
      console.log("## OnEnded")
    },
    onPaused() {
      console.log("## OnPaused")
    },
    onPlayed() {
      console.log("## OnPlayed")
    },
  }
}
</script>