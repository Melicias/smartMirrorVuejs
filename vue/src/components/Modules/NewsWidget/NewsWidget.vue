<template>
  <Splide
    ref="splide"
    :options="{ rewind: true, arrows: false, autoplay: true }"
    aria-label="My Favorite Images"
    style="color: #fff"
  >
    <SplideSlide
      data-splide-interval="20000"
      v-for="(noticia, index) in this.news"
      :key="index"
    >
      <div style="color: #fff; text-align: center">
        <h3 style="margin: 5px; padding: 0">{{ noticia.title }}</h3>
        <p style="margin-left: 20px; margin-bottom: 20px" :id="index">
          &nbsp;&nbsp;{{ noticia.description }}
        </p>
        <br />
      </div>
    </SplideSlide>
  </Splide>
</template>

<script>
import { ref } from "vue";
import "@splidejs/vue-splide/css";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import store from "./../../../store/index";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: { Splide, SplideSlide },
  props: {
    // Pass true to use DarkSky API, otherwise it will use OpenWeatherMap API
    config: {},
    apiKey: {
      type: String,
      default: "e738e1605eb049469d46f2785d0f78c9", //5770ad4f261349b886ca4a187e593fb9
    },
    category: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "en",
    },
    country: {
      type: String,
      default: "",
    },
    pageSize: {
      type: Number,
      default: 20,
    },
  },
  name: "App",
  import: [],
  data() {
    return {
      news: [],
      url: "https://newsapi.org/v2/top-headlines?",
    };
  },
  computed: {
    ...mapGetters(["swiping"]),
  },
  created() {
    setInterval(this.getNews, 900000);
    //setInterval(this.changeNews, 60000);
    //setInterval(this.swapNews, 300000);
    this.getNews();
    console.log(store._mutations);
  },

  watch: {
    swiping: {
      handler: function (newValue, oldValue) {
        console.log(newValue);
        switch (newValue?.movement) {
          case 1:
            this.next();
            break;
          case 0:
            this.previous();
            break;
          default:
        }
      },
      immediate: true,
    },
  },

  methods: {
    getNews: function () {
      fetch(
        this.url +
          `apiKey=${this.apiKey}` +
          `&country=` +
          this.country +
          `&language=` +
          this.language +
          `&category=` +
          this.category +
          `&pageSize=` +
          this.pageSize
      )
        .then((resp) => resp.json())
        .then((data) => {
          this.news = data.articles;
          return data;
        });
    },
    next: function () {
      if(this.$refs.splide != undefined){
        this.$refs.splide.go(">");
      }
    },
    previous: function () {
      if(this.$refs.splide != undefined){
        this.$refs.splide.go("<");
        }
    },
    changeNews: function () {
      //funcao para ir bsucar as noticias
    },
    swapNews: function () {
      //funcao para ir bsucar as noticias
    },
  },
  setup() {
    const splide = ref();
    return { splide };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
