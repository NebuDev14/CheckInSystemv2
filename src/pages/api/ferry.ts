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
  const stopId = "25"

  /* --- SCHEDULED TIME ---- */

  const rawData: string = fs.readFileSync(`${process.cwd()}/src/utils/ferry/schedule.txt`, 'utf-8')

  const trips: string = fs.readFileSync(`${process.cwd()}/src/utils/ferry/trips.txt`, 'utf-8')

  const east90TripIds = trips.split("\n").filter(trip => trip.split(",")[3] === "\"East 90th St\"" && trip.split(",")[0] === "\"AS\"").map(trip => trip.split(",")[2])
  // const wallStTripIds = trips.split("\n").filter(trip => trip.split(",")[3] === "\"Wall St./Pier 11\"" && trip.split(",")[0] === "\"AS\"").map(trip => trip.split(",")[2])

  const times: {
    time: string;
    destination: string;
    stopType: StopType;
  }[] = [];

  rawData.split("\n").filter(stop => stop.split(",")[3] === "25").forEach(stop => {
    times.push({
      time: stop.split(",")[1],
      destination: east90TripIds.includes(stop.split(",")[0]) ? "East 90th St" : "Wall St./Pier 11",
      stopType: StopType.SCHEDULED
    })
  })

  times.sort(function compare(a, b) {
    return (parseInt(a.time.split(":")[0])*60 + parseInt(a.time.split(":")[1])) - (parseInt(b.time.split(":")[0])*60 + parseInt(b.time.split(":")[1]))
  })

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

      if (currentTripUpdate.stopTimeUpdate[j].stopId === stopId) {

        for (let x = 0; x < stop.length; x++) {
          if (stop[x].arrival) allRealTimeRaw.push({
            tripId: currentTripUpdate.trip.tripId,
            arrival: stop[x].arrival
          })
        }
      }
    }
  }


  res.status(200).json(times)
}
