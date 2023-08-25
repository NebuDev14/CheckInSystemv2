// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TripUpdate } from '@/utils/gtfs-types';
const realtime = require('gtfs-realtime-bindings');
const fs = require('fs');

/* --- TYPES --- */


enum StopType {
  SCHEDULED,
  REALTIME
}

/* Type declaration for return type data, housing the scheduled stops and realtime stops from NYC Ferry GTFS */
type Data = {
  incoming: {
    time: string;
    destination: string;
    stopType: StopType;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  /* Unique Stop ID number for Roosevelt Island Ferry */
  const stopId = "20"

  /* --- SCHEDULED TIME ---- */




  /* --- REAL TIME ---- */

  /* Fetch real time updates for ferry */
  const allEntities = await fetch('http://nycferry.connexionz.net/rtt/public/utility/gtfsrealtime.aspx/tripupdate')
    .then((res => res.arrayBuffer()))
    .then(data => realtime.transit_realtime.FeedMessage.decode(new Uint8Array(data)))

  /* Collection of all realtime stops without classification of destination */

  const allRealTimeRaw: {
    tripId: string;
    arrival?: {
      time: string;
    };
  }[] = [];

  for (let i = 0; i < allEntities?.entity.length; i++) {
    for (let j = 0; j < allEntities?.entity[i].tripUpdate?.stopTimeUpdate?.length; j++) {
      const currentTripUpdate: TripUpdate = allEntities?.entity[i].tripUpdate;
      const stop = currentTripUpdate.stopTimeUpdate.filter(update => update.stopId === stopId);

      if (currentTripUpdate.stopTimeUpdate[j].stopId === stopId ) {

        for(let x = 0; x < stop.length; x++) {
          if(stop[x].arrival) allRealTimeRaw.push({
            tripId: currentTripUpdate.trip.tripId,
            arrival: stop[x].arrival
          })
        }
      }
    }
  }


  res.status(200).json(allRealTimeRaw)
}
