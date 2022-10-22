<template>
  <div class="Calendar-list">
    <div class="container" style="display: block">
      <div id="module_2_clock" class="module clock clock">
        <header class="module-header" style="display: none">undefined</header>
        <div class="module-content">
          <div class="clockGrid">
            <div class="clockCircle"></div>
            <div
              class="digital"
              style="grid-area: center / center / center / center"
            >
              <div class="date normal medium">
                {{ time.date.weekDay }}, {{ time.date.month }}
                {{ time.date.day }}, {{ time.date.year }}
              </div>
              <div class="time bright large light">
                {{ time.hours }}:{{ time.minutes
                }}<sup class="seconds dimmed">{{ time.seconds }}</sup>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="module_3_calendar"
        class="module calendar"
        style="transition: opacity 1s ease 0s; opacity: 1; position: static"
      >
        <header class="module-header" style="display: block">
          {{ calendarTitle }}
        </header>
        <div class="module-content">
          <table class="small">
            <tr
              class="normal event"
              v-for="(holiday, index) in this.holidays"
              :key="index"
              :style="{
                opacity:
                  index == 0
                    ? 1
                    : index == 1
                    ? 1
                    : index == 2
                    ? 0.666667
                    : 0.333333,
              }"
            >
              <td class="symbol align-right">
                <span class="fas fa-fw fa-calendar-check"></span>
              </td>
              <td class="title bright">{{ holiday.summary }}</td>
              <td class="time light">{{ formatDate(holiday.start?.date) }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { APIService } from "../services/APIService";
//import { HolidayModel } from "../Models/holidayModel";
export default {
  name: "CalendarWidget",
  data() {
    return {
      apiService: null,
      interval: null,
      weekday: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      calendarTitle: null,
      time: {
        date: {
          day: null,
          month: null,
          year: null,
          weekDay: null,
        },
        hours: null,
        minutes: null,
        seconds: null,
      },
      holidays: [],
    };
  },
  methods: {
    fetchHolidays: function () {
      var ToDate = new Date();
      this.apiService.getHolidaysAsync().then((data) => {
        
        this.calendarTitle = data.summary;
        var temp = data.items
          .filter(
            (x) =>
              new Date(x.start.date).getTime() >= ToDate.getTime() &&
              x.description == "Public holiday"
          )
          .sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          })
          .slice(0, 4);

        //mapping
        temp.map((x) => {
          var holiday = {
            created: x.created,
            description: x.description,
            end: x.end,
            status: x.status,
            summary: x.summary,
            start: x.start,
          };
          this.holidays.push(holiday);
        });
      });
    },
    formatDate: function (date) {
      var options = {
        month: "short",
        day: "2-digit",
      };
      var today = new Date(date);
      return today.toLocaleDateString("en-US", options);
    },
  },
  beforeUnmount() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  created() {
    (this.apiService = new APIService()),
      // update the time every second
      (this.interval = setInterval(() => {
        var timer = new Date();
        this.time = {
          date: {
            day: timer.getDay(),
            month: timer.toLocaleString("en-US", { month: "long" }),
            year: timer.getFullYear(),
            weekDay: this.weekday[timer.getDay()],
          },
          hours:
            timer.getHours() < 10 ? "0" + timer.getHours() : timer.getHours(),
          minutes:
            timer.getMinutes() < 10
              ? "0" + timer.getMinutes()
              : timer.getMinutes(),
          seconds:
            timer.getSeconds() < 10
              ? "0" + timer.getSeconds()
              : timer.getSeconds(),
        };
      }, 1000));
    this.fetchHolidays();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/variables.css";

.clockGrid {
  display: inline-flex;
  gap: 15px;
}
.clockCircle {
  place-self: center;
  position: relative;
  border-radius: 50%;
  background-size: 100%;
}

.clockFace {
  width: 100%;
  height: 100%;
}

.clockFace::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: var(--color-text-bright);
  border-radius: 3px;
  content: "";
  display: block;
}

.clockHour {
  width: 0;
  height: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -2px 0 -2px -25%; /* numbers must match negative length & thickness */
  padding: 2px 0 2px 25%; /* indicator length & thickness */
  background: var(--color-text-bright);
  transform-origin: 100% 50%;
  border-radius: 3px 0 0 3px;
}

.clockMinute {
  width: 0;
  height: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -35% -2px 0; /* numbers must match negative length & thickness */
  padding: 35% 2px 0; /* indicator length & thickness */
  background: var(--color-text-bright);
  transform-origin: 50% 100%;
  border-radius: 3px 0 0 3px;
}

.clockSecond {
  width: 0;
  height: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -38% -1px 0 0; /* numbers must match negative length & thickness */
  padding: 38% 1px 0 0; /* indicator length & thickness */
  background: var(--color-text);
  transform-origin: 50% 100%;
}

.Calendar-list {
  font-size: var(--font-size);
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

sup {
  font-size: 50%;
  line-height: 50%;
}

/**
   * Module styles.
   */

.module {
  margin-bottom: var(--gap-modules);
}

.calendar .symbol {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-left: 0;
  padding-right: 10px;
  font-size: var(--font-size-small);
}

.calendar .symbol span {
  padding-top: 4px;
}

.calendar .title {
  padding-left: 0;
  padding-right: 0;
}

.calendar .time {
  padding-left: 30px;
  text-align: right;
  vertical-align: top;
}
</style>
