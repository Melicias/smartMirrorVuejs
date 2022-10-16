import { Season, Standing } from "../Models/SoccerModels";
export class APIService {
  url: string | undefined;
  getHolidaysAsync(): Promise<any> {
    const BASE_CALENDAR_URL =
      "https://www.googleapis.com/calendar/v3/calendars";
    const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY =
      "holiday@group.v.calendar.google.com"; // Calendar Id. This is public but apparently not documented anywhere officialy.
    const API_KEY = process.env.VUE_APP_GOOGLE_API_KEY;
    const CALENDAR_REGION = "en.portuguese";
    const url = `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}`;
    return fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        return data;
      });
  }

  getSoccerData(league_id: number): Promise<Standing[]> {
    const BASE_URL = "https://app.sportdataapi.com/api/v1/soccer";
    const API_KEY = process.env.VUE_APP_SOCCER_API_KEY;
    const standings: Standing[] = [];
    console.log(API_KEY);
    league_id = 490;
    const URL_SEASON = `${BASE_URL}/seasons?apikey=${API_KEY}&league_id=${league_id}`;
    console.log(URL_SEASON);
    return new Promise((resolve, reject) => {
      fetch(URL_SEASON)
        .then((resp) => resp.json())
        .then((data) => {
          let seasons = [];
          seasons = data.data.slice(Math.max(data.data.length - 2, 0));
          let seasonID: number | undefined;
          seasons.map((x: Season) => {
            if (!x.is_current) {
              seasonID = x.season_id;
            }
          });
          const URL_STANDINGS = `${BASE_URL}/standings?apikey=${API_KEY}&season_id=${seasonID}`;
          return fetch(URL_STANDINGS);
        })
        .then((resp) => resp.json())
        .then((data) => {
          let standing: Standing;
          data.data.standings.slice(0, 1).map((x: Standing) => {
            standing = x;
            const URL_TEAM = `${BASE_URL}/teams/${x.team_id}?apikey=${API_KEY}`;
            fetch(URL_TEAM)
              .then((resp) => resp.json())
              .then((data) => {
                standing.team_name = data.data.name;
                standing.team_logo = data.data.logo;
              });
            standings.push(standing);
          });
          return standings;
        })
        .then((x) => resolve(x));
    });
  }
}
