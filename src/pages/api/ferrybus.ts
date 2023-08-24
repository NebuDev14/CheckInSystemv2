// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const realtime = require('gtfs-realtime-bindings');

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allEntities = await fetch('http://nycferry.connexionz.net/rtt/public/utility/gtfsrealtime.aspx/tripupdate')
    .then((res => res.arrayBuffer()))
    .then(data => realtime.transit_realtime.FeedMessage.decode(new Uint8Array(data)))

  const allStops: any[] = [];
  for(let i = 0; i < allEntities?.entity.length; i++) {
    for(let j = 0; j < allEntities?.entity[i].tripUpdate?.stopTimeUpdate?.length; j++) {
      if(allEntities?.entity[i].tripUpdate?.stopTimeUpdate[j].stopId === "25") allStops.push(allEntities?.entity[i].tripUpdate)
    }
  }

  res.status(200).json(allStops)
}
