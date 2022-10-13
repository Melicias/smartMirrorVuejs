export class APIService{
    url:string | undefined
    apiKey='23092e9c-4b9f-4956-95f5-02ce7eee30ec'
      getHolidaysAsync():Promise<any>{
        const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
        const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY = "holiday@group.v.calendar.google.com"; // Calendar Id. This is public but apparently not documented anywhere officialy.
        const API_KEY = process.env.VUE_APP_GOOGLE_API_KEY;
        const CALENDAR_REGION = "en.portuguese";
        const url = `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}`;
            return fetch( url)
            .then((resp) => resp.json())
            .then((data) => {
              return data;
            })         
    }
}