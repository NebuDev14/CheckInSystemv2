import type { NextApiRequest, NextApiResponse } from 'next'

require("dotenv").config()

const codes = [
  "3AR11",
  "3A629"
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  let incoming: any[] = [];

  codes.forEach(async (code, i) => {
    await fetch(`https://otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?stops=MTASBWY%${code}&apikey=${process.env.API_KEY}`)
      .then((res => res.json()))
      // @ts-ignore
      .then(data => data[0].groups.forEach(train => {
        incoming = [...incoming, train]
      }))
      .catch((e) => console.log(e))
    i == codes.length - 1 ? res.status(200).json(incoming) : null // i HATE js THIS LANGUAGE IS SO STUPID
  })

}
