<template>
    <v-date-picker
        show-weeknumbers  
        v-model="date"
        color="red" 
        is-dark/>
</template>

<script>
  export default {
  components: {},
    name: 'App',
    import:[],
    data () {
        return {
            date: new Date(),
        }
    }
  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vc-container.vc-is-dark {
    background-color: #000;
    border: 0px;
    color: #fff
}

.vc-title {
    color: #fff !important
}
</style>