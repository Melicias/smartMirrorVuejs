<template>
    <vue-weather
        api-key="cd38b793c29e32a02798494f81e4df0c"
        units="metric"
        :latitude=this.latitude
        :longitude=this.longitude
        text-color="#fff"
        positionstackApi="00d723792211b93a60ad2af7d349ce47"
        v-bind:hide-header="false"
        language="en"
    />
</template>

<script>
  import VueWeather from "vue-weather-widget";
  export default {
  components: {VueWeather},
    name: 'App',
    props: {
      config: {},
    },
    import:[VueWeather],
    data () {
      return {
        latitude:this.config.latitude,
        longitude:this.config.longitude
      }
    }
  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
