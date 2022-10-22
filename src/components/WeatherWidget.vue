<template>
    <vue-weather
        api-key="cd38b793c29e32a02798494f81e4df0c"
        units="metric"
        latitude="39.734097"
        longitude="-8.821209"
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
    import:[VueWeather],
    data () {
      return {}
    }
  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
