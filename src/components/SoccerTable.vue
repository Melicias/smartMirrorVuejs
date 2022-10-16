<template>
  <div
    id="module_10_MMM-Formula1"
    class="module MMM-Formula1"
    style="transition: opacity 1.25s ease 0s; opacity: 1; position: static"
  >
    <header class="module-header" style="display: block">
      Premier League Portugal
    </header>
    <div class="module-content">
      <div>
        <table class="small align-left">
          <thead>
            <tr class="normal dimmed">
              <td></td>
              <td>Position</td>
              <td class="light symbol stat">Team</td>
              <td class="light symbol align-right stat">GP</td>
              <td class="light symbol align-right stat">W</td>
              <td class="light symbol align-right stat">D</td>
              <td class="light symbol align-right stat">L</td>
              <td class="light symbol align-right stat">GD</td>
              <td class="light symbol align-right stat">PTS</td>
            </tr>
          </thead>
          <tbody>
            <tr
              class="normal"
              style="opacity: 1"
              v-for="(standing, index) in standings"
              :key="index"
              :class="{ evenRow: index % 2 == 0, oddRow: index % 2 != 0 }"
            >
              <td class="symbol stat">
                <div class="flag flag-nl grayscale">
                  <img :src="standing.team_data.logo" alt="" />
                </div>
              </td>
              <td class="title stat">{{ standing.position }}</td>
              <td class="title light stat">
                {{ standing.team_data.short_code }}
              </td>
              <td class="align-right stat">
                {{ standing.overall.games_played }}
              </td>
              <td class="align-right stat">
                {{ standing.overall.won }}
              </td>
              <td class="title light stat">{{ standing.overall.draw }}</td>
              <td class="align-right stat">
                {{ standing.overall.lost }}
              </td>
              <td class="align-right stat">
                {{ standing.overall.goals_diff }}
              </td>
              <td class="align-right stat">{{ standing.points }}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td class="xsmall align-right" colspan="5">
                Season: 2022, Round: 18
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { APIService } from "../services/APIService";
import { Season, Standing } from "../Models/SoccerModels";
import { defineComponent, toRaw } from "vue";
export default defineComponent({
  components: {},
  name: "App",
  import: [],

  data() {
    return {
      apiService: null,
      standings: [],
      clearCache: false,
    };
  },
  methods: {
    fetchStandings: function () {
      //estou a guardar na chace para nao usar os pedidos da api pq esta merda é chata que doi
      var standingStore = localStorage["scoccerStandingsData"];
      if (standingStore) {
        this.standings = JSON.parse(standingStore);
      } else {
        let apiService = new APIService();
        var league_id = 490; //1 liga de portugal hardcoded
        apiService.getSoccerData(league_id).then((x) => {
          this.standings.push(...x);
          localStorage["scoccerStandingsData"] = JSON.stringify(this.standings);
        });
      }
    },
  },
  created() {
    this.fetchStandings();
    setInterval(() => {
      this.fetchStandings();
    }, 86400000);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/variables.css";

img {
  /* IE6-9 */
  /* filter: gray; */
  /* Google Chrome, Safari 6+ & Opera 15+ */
  /* -webkit-filter: grayscale(1);  */
  /* Microsoft Edge and Firefox 35+ */
  /* filter: grayscale(1);  */
  width: 1.5rem;
  height: 1.5rem;
}

header {
  text-transform: uppercase;
  font-size: var(--font-size-xsmall);
  font-family: var(--font-primary), Arial, Helvetica, sans-serif;
  font-weight: 400;
  border-bottom: 1px solid var(--color-text-dimmed);
  line-height: 15px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  color: var(--color-text);
}
::-webkit-scrollbar {
  display: none;
}

/**
   * Default styles.
   */
.evenRow {
  color: rgb(255, 255, 255);
}
.oddRow {
  color: var(--color-text);
}
.align-right {
  text-align: right;
}

.dimmed {
  color: var(--color-text-dimmed);
}

.bright {
  color: var(--color-text-bright);
}

.xsmall {
  font-size: var(--font-size-xsmall);
  line-height: 1.275;
}

.small {
  font-size: var(--font-size-small);
  line-height: 1.25;
}

.medium {
  font-size: var(--font-size-medium);
  line-height: 1.225;
}

.large {
  font-size: var(--font-size-large);
  line-height: 1;
}
.MMM-Formula1 table {
  border-spacing: 5px 0;
  border-collapse: separate;
}

.MMM-Formula1 .symbol {
  padding-right: 5px;
}

.MMM-Formula1 .stat {
  padding-left: 20px;
  padding-right: 0;
}

/* Flag Sprites - https://www.flag-sprites.com/en_US/ */
</style>
