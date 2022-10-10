<template>

    <div style="color: #fff">
        <div v-for="(noticia,index) in this.news" :key="index"> 
            <h3>{{noticia.title}}</h3>
        </div>
    </div>
</template>

<script>
  export default {
    components: {},
    props: {
        // Pass true to use DarkSky API, otherwise it will use OpenWeatherMap API
        apiKey: {
            type: String,
            default: "5770ad4f261349b886ca4a187e593fb9",//9
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
        news: [],
        bulkNews: [],
        url: "https://newsapi.org/v2/top-headlines?"
      }
    },
    created() {
        setInterval(this.getNews, 900000);
        setInterval(this.changeNews, 60000);
        setInterval(this.swapNews, 300000);
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
                this.bulkNews = data.articles;
                const half = Math.ceil(this.bulkNews.length / 2);    

                this.news = this.bulkNews.slice(0, half)
                return data;
            });
            console.log(this.news)
        },
        changeNews: function() {
            //funcao para ir bsucar as noticias
        },
        swapNews: function() {
            //funcao para ir bsucar as noticias
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>