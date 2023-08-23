// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const realtime = require('gtfs-realtime-bindings');

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await fetch('http://nycferry.connexionz.net/rtt/public/utility/gtfsrealtime.aspx/tripupdate')
    .then((res => res.arrayBuffer()))
    .then(data => realtime.transit_realtime.FeedMessage.decode(new Uint8Array(data)))
    .then(feed => feed.entity.forEach((entity: any) => {
      if(entity.tripUpdate) console.log(entity.tripUpdate)
    }))
  res.status(200).json({ name: 'John Doe' })
}
