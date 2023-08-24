import type { NextApiRequest, NextApiResponse } from "next";
const fs = require('fs');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const extraTimes = new Date().getDay() >= 5;

  const rawData: string = fs.readFileSync(`${process.cwd()}/src/utils/schedule.txt`, 'utf-8')
  const times: string[] = [];
  console.log()
  rawData.split("\n").forEach(stop => {
    const chunks = stop.split(",");
    if ((chunks[0].startsWith("car1_Fri-Sat_Extension_toM") && extraTimes) || (chunks[0].startsWith("car1_Standard_toM"))) {
      times.push(parseInt(chunks[1].slice(0, 2)) % 24 + chunks[1].slice(2));
    }
  })

  res.status(200).send({ times: times })

}
