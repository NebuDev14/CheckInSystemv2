import type { NextApiRequest, NextApiResponse } from 'next'

export enum Condition {
  SUNNY,
  PARTLY,
  CLOUDY,
  RAIN,
  SNOW,
  THUNDER
}

type Forecast = {
  temperature: number;
  desc: String;
  condition: Condition;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Forecast[]>
) {
  const rawWeather = await fetch('https://api.weather.gov/gridpoints/OKX/35,37/forecast/hourly')
    .then(res => res.json())
    .then(data => data.properties.periods);
  
    const result: Forecast[] = [];

    for(let i = 0; i < 5; i++) {
      let condition: Condition = Condition.SUNNY;

      // TODO: i could totally make this efficient but it's 3 AM so i will do that later

      if(rawWeather[i].shortForecast.includes("Rain") || rawWeather[i].shortForecast.includes("Showers")) condition = Condition.RAIN;
      if(rawWeather[i].shortForecast.includes("Thunderstorm") || rawWeather[i].shortForecast.includes("Lightning")) condition = Condition.RAIN;
      else if (rawWeather[i].shortForecast === "Partly Cloudy") condition = Condition.PARTLY;
      else if (rawWeather[i].shortForecast === "Mostly Cloudy") condition = Condition.CLOUDY;
      else if (rawWeather[i].shortForecast.includes("Snow")) condition = Condition.SNOW;

      result.push({
        temperature: rawWeather[i].temperature,
        desc: rawWeather[i].shortForecast,
        condition: condition
      })
    }
  

  res.status(200).json(result)
}
