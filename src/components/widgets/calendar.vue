<template>
    <div>teste</div>
    <FullCalendar />
    
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
  export default {
     components: {
        FullCalendar // make the <FullCalendar> tag available
  },
    data() {
      return {
        value: '',
        context: null
      }
    },
    methods: {
      onContext(ctx) {
        this.context = ctx
      }
    }
  }
</script>
