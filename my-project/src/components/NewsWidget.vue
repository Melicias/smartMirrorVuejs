<template>
    <div>
        <div v-for="(noticia,index) in this.news" :key="index"> 
            <h3>{{noticia.title}}</h3>
        </div>
    </div>
    <h1>{{this.news}}</h1>
</template>

<script>
  export default {
    components: {},
    props: {
        // Pass true to use DarkSky API, otherwise it will use OpenWeatherMap API
        apiKey: {
            type: String,
            default: "5770ad4f261349b886ca4a187e593fb9",
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
            default: 10,
        }
    },
    name: 'App',
    import:[],
    data () {
      return {
        news: "",
        url: "https://newsapi.org/v2/top-headlines?"
      }
    },
    created() {
        setInterval(this.getNews, 900000);
        setInterval(this.changeNews, 60000);
        this.getNews()
    },
    methods: {
        getNews: function() {
            fetch( this.url + `apiKey=${this.apiKey}` +
            `&country=` + this.country +
            `&language=` + this.language + 
            `&category=` + this.category +
            `&pageSize=` + this.pageSize)
            .then((resp) => resp.json())
            .then((data) => {
                this.news = data.articles;
                return data;
            });
            console.log(this.news)
        },
        changeNews: function() {
            //funcao para ir bsucar as noticias
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>