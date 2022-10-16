<template>
  <div style="color:#fff;text-align: center;">
    <span v-show="this.show" class="bright medium light center" style="font-size: 40px;">
      {{this.foo}}
    </span>
  </div>
</template>

<script>
  
  export default {
  components: {},
    name: 'WaterWidget',
    import:[],
    data () {
      return {
        show: false,
        foo: "Did you have enough water today?",
        phrases: ["Did you have enough water today?", "Hey buddy, you should have some water!","Drink water, bro.","'Better to have stones in the way than in the Kidneys: Drink water!'",
        "It's been such a long time since your last glass of water...","Water! Water! Water!","Are you anxious for the next glass of water?"],
        additionalPhrases: [],
        startTime: "00:00",
        endTime: "23:59",
        messageDuration: 3000,//1 * 60 * 1000, // 1 min showing on the screen
        reminderFrequency: 6000,//60 * 60 * 1000, // hourly reminder
        days: [0,1,2,3,4,5,6],
        alarm: {
          status: false, 
          daysWithAudibleReminder: [0],
          src: "done-for-you.mp3",
          startTime: "09:00",
          endTime: "17:00",
        }
      }
    },
    mounted() {
        setInterval(this.switch, this.reminderFrequency);
    },
    methods: {
      switch: function(){
        console.log("teste")
        if (this.phrases.length === 1) {
          this.foo = this.phrases[0];
        }
        var generate = () => {
          return Math.floor(Math.random() * this.phrases.length);
        };
        var phraseIndex = generate();

        while (this.phrases[phraseIndex] === this.foo) {
          phraseIndex = generate();
        }
        this.foo = this.phrases[phraseIndex];
        this.show = true
        setTimeout(this.reminder, this.messageDuration)
      },
      reminder: function(){
        this.show = false
      }
    },
  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
