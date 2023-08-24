import type { NextApiRequest, NextApiResponse } from 'next'

type Forecast = {
  temperature: number;
  desc: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Forecast>
) {
  const rawWeather = await fetch('https://api.weather.gov/gridpoints/OKX/35,37/forecast/hourly')
    .then(res => res.json())
    .then(data => data.properties.periods[0]);

  res.status(200).json({
    temperature: rawWeather.temperature,
    desc: rawWeather.shortForecast
  })
}
