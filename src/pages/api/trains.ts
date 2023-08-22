import type { NextApiRequest, NextApiResponse } from 'next'

require("dotenv").config()

const codes = [
  "3AR11",
  "3A629"
]

type Stop = {
  train: string;
  destination: string;
  headSign: string;
  time: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stop[]>
) {

  let incoming: Stop[] = [];

  codes.forEach(async (code, i) => {
    await fetch(`https://otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?stops=MTASBWY%${code}&apikey=${process.env.API_KEY}`)
      .then((res => res.json()))
      // @ts-ignore
      .then(data => data[0].groups.forEach(train => {
        incoming = [...incoming, {
          train: train.route.shortName as string,
          destination: train.times[0].tripHeadsign as string,
          headSign: train.times[0].stopHeadsign as string,
          time: train.times[0].arrivalFmt as string,
        }]
      }))
      .catch((e) => console.log(e))
    i == codes.length - 1 ? res.status(200).json(incoming) : null // i HATE js THIS LANGUAGE IS SO STUPID
  })

}
