<template>
  <div
    id="module_10_MMM-Formula1"
    class="module MMM-Formula1"
    style="transition: opacity 1.25s ease 0s; opacity: 1; position: static"
  >
    <header class="module-header" style="display: block">F1 Standings</header>
    <div class="module-content">
      <div>
        <table class="small align-left">
          <thead>
            <tr class="normal">
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
            >
              <td class="symbol light">
                <div class="flag flag-nl grayscale"></div>
              </td>
              <td class="title bright stat">{{ standing.position }}</td>
              <td class="title light stat">{{ standing.team_name }}</td>
              <td class="bright align-right stat">
                {{ standing.overall.games_played }}
              </td>
              <td class="bright align-right stat">
                {{ standing.overall.won }}
              </td>
              <td class="title light stat">{{ standing.overall.draw }}</td>
              <td class="bright align-right stat">
                {{ standing.overall.lost }}
              </td>
              <td class="bright align-right stat">
                {{ standing.overall.goals_diff }}
              </td>
              <td class="bright align-right stat">{{ standing.points }}</td>
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
    };
  },
  methods: {
    fetchStandings: function () {
      let apiService = new APIService();
      return apiService.getSoccerData(123123);
    },
    getStandings: function () {
      return { ...this.standings };
    },
  },
  created() {
    this.fetchStandings().then((x) => {
      this.standings.push(...x);
    });
    console.log(this.standings);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/variables.css";

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

.align-right {
  text-align: right;
}

.dimmed {
  color: var(--color-text-dimmed);
}

.normal {
  color: var(--color-text);
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
