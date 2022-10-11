<template>
    <span id="day">{{date}}</span>
    <br>
    <span id="hour">{{timestamp}}</span>
</template>

<script>
  export default {
  components: {},
    name: 'App',
    import:[],
    data () {
      return {
        date: "",
        timestamp: "",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      }
    },
    created() {
        setInterval(this.getNow, 1000);
    },
    methods: {
        getNow: function() {
            const today = new Date()
            const date = this.days[today.getDay()] + ', ' + today.getDate() + ' ' + (this.monthNames[today.getMonth()]) + ', ' +today.getFullYear()
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            this.date = date
            this.timestamp = time
        }
    }
  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#day {
    color: #fff;
    font-size: 30px;
}

#hour {
    color: #fff;
    font-size: 100px;
}
</style>